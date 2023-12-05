import * as Yup from 'yup';
import {
  Alert,
  Box,
  Divider,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  MenuItem,
  Stack,
  TextFieldProps,
} from '@mui/material';
import {yupResolver} from '@hookform/resolvers/yup';
import FormProvider, {RHFAutocomplete, RHFCheckbox, RHFSelect, RHFTextField,} from 'src/components/hook-form';
import {DatePicker} from '@mui/x-date-pickers';
import {useUsersCreateMutation} from 'src/api-hooks/user/useUsersCreateMutation';
import {
  ApiError,
  GenderEnum,
  LanguageSkillsQueryResponseDataItem, MajaClient,
  UsersCreateRequestBody,
  UserTypeEnum
} from 'src/_requests/Maja';
import {useSnackbar} from 'src/components/snackbar';
import {LoadingButton} from '@mui/lab';
import {useCallback, useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import RHFTelInput from 'src/components/hook-form/RHFTelInput';
import useGeoInfo from 'src/hooks/useGeoInfo';
import {MuiTelInputCountry} from 'mui-tel-input';
import Iconify from 'src/components/iconify';
import {phoneRegexp} from 'src/yup/regexps';
import PasswordStrength from 'src/components/password/PasswordStrength';
import {useLanguageskillsQuery} from 'src/api-hooks/languageskill/useLanguageskillsQuery';
import {FormErrors, parseErrors,} from "src/utils/errors";
import {CreateNurseStepsEnum} from "src/@types/redux/nurse";
import {CreateNurseSteps} from "src/sections/nurse/NurseNewFormSteps/steps";
import {useRouter} from "next/router";
import {PATH_DASHBOARD, PATH_PAGE} from "src/routes/paths";
import useIsAvailableUser from "src/sections/nurse/hooks/useAvailableUser";
import useStepData from "src/sections/nurse/hooks/useStepData";
import {useUsersIdUpdateMutation} from "src/api-hooks/user/useUsersIdUpdateMutation";
import useStep from "src/sections/nurse/hooks/useStep";

type PersonalInfoFormStepProps = {
  // ...
};

interface PersonalInfoFormStepValuesProps extends UsersCreateRequestBody {
  afterSubmit?: string;
}

type UsersCreateRequestSchema = {
  [K in keyof UsersCreateRequestBody]: Yup.AnySchema;
};

export default function PersonalInfoFormStep(props: PersonalInfoFormStepProps) {
  const {enqueueSnackbar} = useSnackbar();

  const {userId} = useStepData()
  const {user, userFound, isLoading: isUserFindLoading} = useIsAvailableUser(userId)

  const isEdit = !!user

  const [birthDate, setBirthDate] = useState<Date | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const {geoInfo} = useGeoInfo();

  const {data: languageSkillsResult} = useLanguageskillsQuery({filters: {}});
  const languageSkills = languageSkillsResult?.data?.items || [];

  const {mutateAsync: createUser} = useUsersCreateMutation();
  const {mutateAsync: updateUser} = useUsersIdUpdateMutation();

  const router = useRouter()

  const nextStep = useCallback((step: string, uId: string, nId?: string) => {
    router.push(PATH_DASHBOARD.nurse.edit(step, uId, nId))
  }, [router]);

  const toggleShowPassword = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);


  const passwordValidation = Yup.string()
    .label("Password")
    .required("Password is required")
    .min(8, "Password must contain at least 8 characters")
    .test("uppercase", "Password must contain at least one uppercase letter", (value) =>
      /(?=.*[A-Z])/.test(value || "")
    )
    .test("lowercase", "Password must contain at least one lowercase letter", (value) =>
      /(?=.*[a-z])/.test(value || "")
    )
    .test("number", "Password must contain at least one number", (value) =>
      /(?=.*\d)/.test(value || "")
    );

  const genderOptions = Object.values(GenderEnum).filter((gender) => gender !== GenderEnum.SELECT);
  const userTypeOptions = Object.values(UserTypeEnum)

  const PersonalInfoSchema = Yup.object().shape<UsersCreateRequestSchema>({
    email: Yup.string().label("Email").email().required(),
    firstName: Yup.string().label("First Name").min(2).max(30).required(),
    lastName: Yup.string().label("Last Name").min(2).max(30).required(),
    phone: Yup.string().label("Phone Number")
      .max(12)
      .matches(phoneRegexp(geoInfo?.country as string))
      .required(),
    gender: Yup.string().label("Gender").oneOf(genderOptions).required(),
    username: Yup.string().label("User Name").min(3).max(30).required(),
    birthDate: Yup.string().label("Date Of Birth").required(),
    // avatarUrl: Yup.string().label("Avatar").required(),
    userType: Yup.string().oneOf(userTypeOptions).label("User Type").required(),
    nationalCode: Yup.string().label("National Code").min(2).max(20).required(),
    accountNumber: Yup.string().label("Account Number").max(30).required(),
    languageSkills: Yup.array<LanguageSkillsQueryResponseDataItem>().label("Language Skills").required(),
    workPhoneNumber: Yup.string().label("Work Phone Number").min(2).max(20).required(),
    registrationNumber: Yup.string().label("Registration Number").min(2).max(30).required(),
    forcedChangePassword: Yup.boolean().label("Force Password Change"),
    password: !isEdit ? passwordValidation : Yup.string().label("Password"),
  });

  const defaultValues = {
    phone: user?.phone || '',
    email: user?.email || '',
    username: user?.username || '',
    password: '',
    lastName: user?.lastName || '',
    birthDate: user?.birthDate || '',
    avatarUrl: user?.avatarUrl || '',
    firstName: user?.firstName || '',
    nationalCode: user?.nationalCode || '',
    accountNumber: user?.accountNumber || '',
    workPhoneNumber: user?.workPhoneNumber || '',
    registrationNumber: user?.registrationNumber || '',
    forcedChangePassword: user?.forcedChangePassword || false,
    gender: user?.gender as GenderEnum || GenderEnum.SELECT,
    userType: UserTypeEnum.NURSE,
    languageSkills: user?.languageSkills || [],
    afterSubmit: '',
  } satisfies PersonalInfoFormStepValuesProps;


  const methods = useForm<PersonalInfoFormStepValuesProps>({
    resolver: yupResolver(PersonalInfoSchema),
    defaultValues,
  });

  const {
    watch,
    setError,
    handleSubmit,
    setValue,
    formState: {errors, isSubmitting},
  } = methods;

  const changeBirthDate = useCallback((date: Date | null) => {
    if (date instanceof Date && !Number.isNaN(date.getTime())) {
      setBirthDate(date);
      setValue('birthDate', date?.toISOString())
    } else {
      setBirthDate(null);
      setValue('birthDate', '')
      setError("birthDate", {
        type: 'manual',
        message: 'Birth Date is invalid',
      });
    }
  }, [setValue, setError]);


  useEffect(() => {
    if (user) {
      setValue('phone', user.phone)
      setValue('email', user.email)
      setValue('username', user.username)
      setValue('lastName', user.lastName)
      changeBirthDate(new Date(user.birthDate || ""))
      setValue('avatarUrl', user.avatarUrl)
      setValue('firstName', user.firstName)
      setValue('nationalCode', user.nationalCode)
      setValue('accountNumber', user.accountNumber)
      setValue('workPhoneNumber', user.workPhoneNumber)
      setValue('registrationNumber', user.registrationNumber)
      setValue('forcedChangePassword', user.forcedChangePassword)
    }

  }, [changeBirthDate, setValue, user])

  const setErrors = (errs: FormErrors) => {
    Object.keys(errs).forEach((field: string) => {
      setError(field as keyof PersonalInfoFormStepValuesProps, {
        type: 'manual',
        message: errs[field],
      });
    });
  };

  const onSubmit = async (personalInfoData: PersonalInfoFormStepValuesProps) => {
    console.log('data', personalInfoData);
    try {
      if (!isEdit) {
        const userResult = await createUser({requestBody: personalInfoData});
        const uId = userResult.data?.id;
        enqueueSnackbar('Nurse Personal Info Added Successfully', {variant: 'success'});
        nextStep(CreateNurseSteps[CreateNurseStepsEnum.ContractInfo].path, uId?.toString() || "")
      } else {
        if (!user?.id) throw new Error("User Id is not defined")
        const userUpdateResult = await updateUser({id: user?.id, requestBody: personalInfoData});
        const uId = userUpdateResult.data?.id;
        enqueueSnackbar('Nurse Personal Info Updated Successfully', {variant: 'success'});
        nextStep(CreateNurseSteps[CreateNurseStepsEnum.ContractInfo].path, uId?.toString() || "")
      }
    } catch (error) {
      if (error instanceof ApiError) {
        console.dir(error.body);
        setErrors(parseErrors(error.body.errors));
        setError('afterSubmit', {
          message: error.body.message || `We couldn't ${isEdit ? "update" : "create"} the user.`,
        });
      } else {
        setError('afterSubmit', {
          message: `We couldn't ${isEdit ? "update" : "create"} the user. Please Contact Support.`,
        });
      }
    }
  };

  if (userId && isUserFindLoading) {
    return <div>loading</div>
  }

  if (userId && !userFound) {
    router.push(PATH_PAGE.page404)
    return null
  }

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      {!!errors.afterSubmit && (
        <Alert sx={{mb: 2}} severity="error">
          {errors.afterSubmit.message}
        </Alert>
      )}

      <Grid container spacing={2} sx={{py: 1}}>
        <Grid item sm={6} md={4}>
          <RHFTextField
            name="firstName"
            label="First Name"
            error={!!errors.firstName}
            helperText={errors.firstName?.message}
          />
        </Grid>

        <Grid item sm={6} md={4}>
          <RHFTextField
            name="lastName"
            label="Last Name"
            error={!!errors.lastName}
            helperText={errors.lastName?.message}
          />
        </Grid>

        <Grid item sm={6} md={4}>
          <RHFTextField
            name="username"
            label="User Name"
            error={!!errors.username}
            helperText={errors.username?.message}
          />
        </Grid>

        <Grid item sm={6} md={4}>
          <RHFSelect
            name="gender"
            label="Gender"
            error={!!errors.gender}
            helperText={errors.gender?.message}
          >
            {Object.keys(GenderEnum).map((gender: string) => (
              <MenuItem key={gender} value={GenderEnum[gender as keyof typeof GenderEnum]}>
                {GenderEnum[gender as keyof typeof GenderEnum]}
              </MenuItem>
            ))}
          </RHFSelect>
        </Grid>

        <Grid item sm={6} md={4}>
          <DatePicker
            value={birthDate}
            label="Date Of Birth"
            views={['day', 'month', 'year']}
            onChange={changeBirthDate}
            renderInput={(params: TextFieldProps) => (
              <RHFTextField
                {...params}
                name="birthDate"
                error={!!errors.birthDate}
                helperText={errors.birthDate?.message}
              />
            )}
          />
        </Grid>

        <Grid item sm={6} md={4}>
          <RHFTextField
            name="nationalCode"
            label="National Code"
            error={!!errors.nationalCode}
            helperText={errors.nationalCode?.message}
          />
        </Grid>

        <Grid item sm={6} md={4}>
          <RHFTextField
            name="email"
            label="Email"
            error={!!errors.email}
            helperText={errors.email?.message}
          />
        </Grid>

        <Grid item sm={6} md={4}>
          {!geoInfo?.country ? (
            <RHFTextField
              name="phone"
              label="Phone Number"
              error={!!errors.phone}
              helperText={errors.phone?.message}
            />
          ) : (
            <RHFTelInput
              name="phone"
              label="Phone Number"
              error={!!errors.phone}
              helperText={errors.phone?.message}
              defaultCountry={(geoInfo?.country as MuiTelInputCountry) || 'FI'}
            />
          )}
        </Grid>

        <Grid item sm={6} md={4}>
          {!geoInfo?.country ? (
            <RHFTextField
              name="workPhoneNumber"
              label="Work Phone Number"
              error={!!errors.workPhoneNumber}
              helperText={errors.workPhoneNumber?.message}
            />
          ) : (
            <RHFTelInput
              name="workPhoneNumber"
              label="Work Phone Number"
              error={!!errors.workPhoneNumber}
              helperText={errors.workPhoneNumber?.message}
              defaultCountry={(geoInfo?.country as MuiTelInputCountry) || 'FI'}
            />
          )}
        </Grid>

        <Grid item sm={6} md={4}>
          <RHFTextField
            name="accountNumber"
            label="Account Number"
            error={!!errors.accountNumber}
            helperText={errors.accountNumber?.message}
          />
        </Grid>

        <Grid item sm={6} md={4}>
          <RHFTextField
            name="registrationNumber"
            label="Registration Number"
            error={!!errors.registrationNumber}
            helperText={errors.registrationNumber?.message}
          />
        </Grid>

        <Grid item sm={6} md={4}>
          <RHFAutocomplete
            multiple
            name="languageSkills"
            label="Language Skills"
            options={languageSkills}
            ChipProps={{size: 'small'}}
            getOptionLabel={(option) => (option as LanguageSkillsQueryResponseDataItem).name || ''}
          />
        </Grid>

        <Grid item sm={6} md={4}>
          <Stack>
            <RHFTextField
              name="password"
              label="Password"
              error={!!errors.password}
              helperText={errors.password?.message}
              type={showPassword ? 'text' : 'password'}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={toggleShowPassword} edge="end">
                      <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'}/>
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            {watch('password') ? (
              <PasswordStrength password={watch('password')}/>
            ) : (
              <Box height={18}/>
            )}
            <RHFCheckbox sx={{pl: 0.5}} name="forceResetPassword" label="Force Reset Password"/>
            <FormHelperText error={!!errors.forcedChangePassword}>
              {errors.forcedChangePassword?.message}
            </FormHelperText>
          </Stack>
        </Grid>
      </Grid>

      <Divider sx={{my: 2}}/>

      <Stack direction="row" spacing={2} justifyContent="flex-end" mt={2}>
        <LoadingButton loading={isSubmitting} variant="contained" type="submit">
          {isEdit ? "Update" : "Create New"} Nurse
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
