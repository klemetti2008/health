import * as Yup from "yup";
import {Alert, Button, Divider, Grid, InputAdornment, Stack, TextFieldProps} from "@mui/material";
import FormProvider, {RHFAutocomplete, RHFTextField} from "src/components/hook-form";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";

import {LoadingButton} from "@mui/lab";
import {useDispatch} from "src/redux/store";
import {
  createNurseActiveStepChanged,
} from "src/redux/slices/nurse";
import {useCallback, useEffect, useState} from "react";
import {useSnackbar} from "src/components/snackbar";

import ContractInfoSubContractorForm from "src/sections/nurse/NurseNewFormSteps/ContractInfoSubContractorForm";
import {
  Section,
  ApiError,
  ExperienceAmountUnitEnum,
  SectionsQueryResponseDataItem,
  NurseTypesQueryResponseDataItem,
  ShiftTypesQueryResponseDataItem,
  ContractTypesQueryResponseDataItem,
  NursesCreateOrUpdateContractRequestBody,
  NursesCreateOrUpdateContractRequestBodyPaymentType,
} from "src/_requests/Maja";
import {DatePicker} from "@mui/x-date-pickers";
import {FormErrors, parseErrors} from "src/utils/errors";
import {useShiftTypesQuery} from "src/api-hooks/shifttype/useShiftTypesQuery";
import {useContractTypesQuery} from "src/api-hooks/contracttype/useContractTypesQuery";
import RHFTReeSelect from "src/components/hook-form/RHFTreeSelect";
import {useSectionsQuery} from "src/api-hooks/section/useSectionsQuery";
import {upperCase} from "lodash";
import {CreateNurseStepsEnum} from "src/@types/redux/nurse";
import {CreateNurseSteps} from "src/sections/nurse/NurseNewFormSteps/steps";
import {useNursetypesQuery} from "src/api-hooks/nursetype/useNursetypesQuery";
import useStepData from "src/sections/nurse/hooks/useStepData";
import {useRouter} from "next/router";
import useIsAvailableUser from "src/sections/nurse/hooks/useAvailableUser";
import {PATH_DASHBOARD, PATH_PAGE} from "src/routes/paths";
import {useNursesContractUserIdUpdateMutation} from "src/api-hooks/nurse/useNursesContractUserIdUpdateMutation";
import {useNursesQuery} from "src/api-hooks/nurse/useNursesQuery";

type ContractInfoFormStepProps = {
  // ...
}

interface ContractInfoFormStepValuesProps extends NursesCreateOrUpdateContractRequestBody {
  afterSubmit: string
}

type NursesUpdateContractRequestSchema = {
  [K in keyof NursesCreateOrUpdateContractRequestBody]: Yup.AnySchema;
};

export default function ContractInfoFormStep(props: ContractInfoFormStepProps) {
  const dispatch = useDispatch()
  const {enqueueSnackbar} = useSnackbar();

  const router = useRouter()

  const {userId} = useStepData()

  const [subcontractorOpen, setSubcontractorOpen] = useState<boolean>(false);
  const [joinedAt, setJoinedAt] = useState<Date | null>(null);
  const [contractStartedAt, setContractStartedAt] = useState<Date | null>(null);
  const [contractExpiresAt, setContractExpiresAt] = useState<Date | null>(null);
  const [quizTime, setQuizTime] = useState<Date | null>(null);

  const {data: nurseDataResult} = useNursesQuery({
    userId: parseInt(userId, 10),
    filters: {},
    sorts: {}
  }, {enabled: !!userId})

  const currentNurse = nurseDataResult?.data?.items?.[0]

  const isEdit = Boolean(currentNurse)

  const {data: shiftTypesData} = useShiftTypesQuery({filters: {}})
  const shiftTypes = shiftTypesData?.data?.items || []

  const {data: contractTypesResult} = useContractTypesQuery({filters: {}})
  const contractTypes = contractTypesResult?.data?.items || []

  const {data: sectionsResult} = useSectionsQuery({filters: {}})
  const sectionItems = sectionsResult?.data?.items || []

  const {data: nurseTypeOptionsResult} = useNursetypesQuery({filters: {}})
  const nurseTypeOptions = nurseTypeOptionsResult?.data?.items || []

  const {mutateAsync: createOrUpdateContractInfo} = useNursesContractUserIdUpdateMutation()

  const toggleSubcontractOpen = () => {
    setSubcontractorOpen(prev => !prev)
  }
  const nextStep = useCallback((step: string, uId: string, nId?: string) => {
    router.push(PATH_DASHBOARD.nurse.edit(step, uId, nId))
  }, [router]);


  const prevStep = useCallback(() => {
    dispatch(createNurseActiveStepChanged(CreateNurseSteps[CreateNurseStepsEnum.PersonalInfo]));
  }, [dispatch])

  const experienceAmountUnitOptions = Object.values(ExperienceAmountUnitEnum)

  const contractInfoSchema = Yup.object().shape<NursesUpdateContractRequestSchema>({
    // SubContractor Info
    companyRegistrationNumber: subcontractorOpen ? Yup.string().label("Company Registration Number").required() : Yup.string().label("Company Registration Number"),
    paymentType: subcontractorOpen ? Yup.object<NursesCreateOrUpdateContractRequestBodyPaymentType>().label("Payment Type").required() :
      Yup.object<NursesCreateOrUpdateContractRequestBodyPaymentType>().label("Payment Type"),
    // attachments TODO: make multi upload file and gallery
    // Contract Info
    joinedAt: Yup.string().label("Joined At").required(),
    contractStartedAt: Yup.string().label("Contract Started At").required(),
    contractExpiresAt: Yup.string().label("Contract Expires At").required(),
    quizTime: Yup.string().label("Quiz Time").required(),
    availableShifts: Yup.array<ShiftTypesQueryResponseDataItem>().label("Available Shifts").required(),
    contractTypes: Yup.array<ContractTypesQueryResponseDataItem>().label("Contract Types").required(),
    percentLengthInContract: Yup.number().label("Percent Length In Contract").required(),
    hourLengthInContract: Yup.number().label("Hour Length In Contract").required(),
    salary: Yup.number().label("Salary").required(),
    sections: Yup.array<SectionsQueryResponseDataItem>().label("Sections").required(),
    certificateCode: Yup.string().label("Certificate Code").required(),
    jobTitle: Yup.string().label("Job Title").required(),
    limitations: Yup.string().label("Limitation"),
    nurseTypes: Yup.array<NurseTypesQueryResponseDataItem>().label("Nurse Type").required(),
    experienceAmount: Yup.number().label("Experience").required(),
    experienceAmountUnit: Yup.string().oneOf(experienceAmountUnitOptions).label("Experience Period").required(),
  });

  const defaultValues = {
    salary: isEdit ? currentNurse?.salary : 0,
    joinedAt: isEdit ? currentNurse?.joined_at?.toString() || undefined : undefined,
    quizTime: isEdit ? currentNurse?.quiz_time?.toString() || undefined : undefined,
    sections: isEdit ? currentNurse?.sections : [],
    nurseTypes: isEdit ? currentNurse?.nurseTypes : [],
    jobTitle: isEdit ? currentNurse?.jobTitle : "",
    availableShifts: isEdit ? currentNurse?.availableShifts : [],
    limitations: isEdit ? currentNurse?.limitations : "",
    paymentType: isEdit ? currentNurse?.paymentType : undefined,
    contractTypes: isEdit ? currentNurse?.contractTypes : [],
    experienceAmount: isEdit ? currentNurse?.experienceAmount : 0,
    contractExpiresAt: isEdit ? currentNurse?.contract_expires_at?.toString() || undefined : undefined,
    contractStartedAt: isEdit ? currentNurse?.contract_started_at?.toString() || undefined : undefined,
    certificateCode: isEdit ? currentNurse?.certificateCode : "",
    hourLengthInContract: isEdit ? currentNurse?.hourLengthInContract : 0,
    percentLengthInContract: isEdit ? currentNurse?.percentLengthInContract : 0,
    companyRegistrationNumber: isEdit ? currentNurse?.companyRegistrationNumber : "",
    experienceAmountUnit: ExperienceAmountUnitEnum.DAY,
    afterSubmit: "",
  } satisfies ContractInfoFormStepValuesProps;

  const methods = useForm<ContractInfoFormStepValuesProps>({
    resolver: yupResolver(contractInfoSchema),
    defaultValues,
  });

  const {
    setError,
    handleSubmit,
    setValue,
    formState: {errors, isSubmitting},
  } = methods;


  const setErrors = (errs: FormErrors) => {
    Object.keys(errs).forEach((field: string) => {
      setError(field as keyof ContractInfoFormStepValuesProps, {
        type: 'manual',
        message: errs[field],
      });
    });
  };

  const changeJoinedAt = useCallback((date: Date | null) => {
    if (date instanceof Date && !Number.isNaN(date.getTime())) {
      setJoinedAt(date);
      setValue('joinedAt', date?.toISOString())
    } else {
      setJoinedAt(null);
      setValue('joinedAt', '')
      setError("joinedAt", {
        type: 'manual',
        message: 'Joined At is invalid',
      });
    }
  }, [setJoinedAt, setValue, setError]);

  const changeContractStartedAt = useCallback((date: Date | null) => {
    if (date instanceof Date && !Number.isNaN(date.getTime())) {
      setContractStartedAt(date);
      setValue('contractStartedAt', date?.toISOString())
    } else {
      setContractStartedAt(null);
      setValue('contractStartedAt', '')
      setError("contractStartedAt", {
        type: 'manual',
        message: 'Contract Started At is invalid',
      });
    }
  }, [setContractStartedAt, setValue, setError]);

  const changeContractExpiresAt = useCallback((date: Date | null) => {
    if (date instanceof Date && !Number.isNaN(date.getTime())) {
      setContractExpiresAt(date);
      setValue('contractExpiresAt', date?.toISOString())
    } else {
      setContractExpiresAt(null);
      setValue('contractExpiresAt', '')
      setError("contractExpiresAt", {
        type: 'manual',
        message: 'Contract Expires At is invalid',
      });
    }
  }, [setContractExpiresAt, setValue, setError]);

  const changeQuizTime = useCallback((date: Date | null) => {
    if (date instanceof Date && !Number.isNaN(date.getTime())) {
      setQuizTime(date);
      setValue('quizTime', date?.toISOString())
    } else {
      setQuizTime(null);
      setValue('quizTime', '')
      setError("quizTime", {
        type: 'manual',
        message: 'Quiz Time is invalid',
      });
    }
  }, [setQuizTime, setValue, setError]);

  useEffect(() => {
    setValue('salary', currentNurse?.salary)
    if (currentNurse?.joined_at) {
      changeJoinedAt(new Date(currentNurse?.joined_at))
    }
    if (currentNurse?.quiz_time) {
      changeQuizTime(new Date(currentNurse?.quiz_time))
    }
    setValue('sections', currentNurse?.sections)
    setValue('nurseTypes', currentNurse?.nurseTypes)
    setValue('jobTitle', currentNurse?.jobTitle)
    setValue('availableShifts', currentNurse?.availableShifts)
    setValue('limitations', currentNurse?.limitations)
    setValue('paymentType', currentNurse?.paymentType)
    setValue('contractTypes', currentNurse?.contractTypes)
    setValue('experienceAmount', currentNurse?.experienceAmount)
    if (currentNurse?.contract_expires_at) {
      changeContractExpiresAt(new Date(currentNurse?.contract_expires_at))
    }
    if (currentNurse?.contract_started_at) {
      changeContractStartedAt(new Date(currentNurse?.contract_started_at))
    }
    setValue('certificateCode', currentNurse?.certificateCode)
    setValue('hourLengthInContract', currentNurse?.hourLengthInContract)
    setValue('percentLengthInContract', currentNurse?.percentLengthInContract)
    setValue('companyRegistrationNumber', currentNurse?.companyRegistrationNumber)
    setValue('experienceAmountUnit', ExperienceAmountUnitEnum.DAY)
  }, [changeContractExpiresAt, changeContractStartedAt, changeJoinedAt, changeQuizTime, currentNurse, setValue])


  const onSubmit = async (contractInfoData: ContractInfoFormStepValuesProps) => {
    try {
      const contractInfoDataResult = await createOrUpdateContractInfo({
        requestBody: contractInfoData,
        userId: parseInt(userId, 10)
      })
      const nId = contractInfoDataResult.data?.id
      if (!nId) throw new Error("Nurse Id is not defined")
      enqueueSnackbar(`Nurse Contract Info ${isEdit ? "Updated" : "Created"} Successfully`, {variant: 'success'});
      nextStep(CreateNurseSteps[CreateNurseStepsEnum.Addresses].path, userId, nId.toString());
    } catch
      (error) {
      if (error instanceof ApiError) {
        console.dir(error.body);
        setErrors(parseErrors(error.body.errors));
        setError('afterSubmit', {
          message: error.body.message || "We couldn't update contract info",
        });
      } else {
        setError('afterSubmit', {
          message: "We couldn't update the contract info. Please Contact Support.",
        });
      }
    }
  };

// Sections Tree Select
  const isBranch = (section: Section) => Boolean(section.children && section.children.length > 0)
  const getSectionParent = (section: Section) => section.parent
  const getSectionChildren = ((section: Section | null) => section === null ? (sectionItems as Section[]) : (section as Section).children || [])

  console.log("render contract info")

  const {userFound, isLoading: isAvailableUserLoading} = useIsAvailableUser(userId)

  if (isAvailableUserLoading) {
    return <div>...</div>
  }

  if (!userFound) {
    router.push(PATH_PAGE.page404)
    return null
  }

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}

      <ContractInfoSubContractorForm toggleOpen={toggleSubcontractOpen} open={subcontractorOpen}/>

      <Grid container spacing={2} sx={{py: 1}}>
        <Grid item sm={6} md={4}>
          <DatePicker
            value={joinedAt}
            label="Joined At"
            views={['day', 'month', 'year']}
            onChange={changeJoinedAt}
            renderInput={(params: TextFieldProps) => (
              <RHFTextField
                {...params}
                name="joinedAt"
                error={!!errors.joinedAt}
                helperText={errors.joinedAt?.message}
              />
            )}
          />
        </Grid>

        <Grid item sm={6} md={4}>
          <DatePicker
            value={contractStartedAt}
            label="Contract Started At"
            views={['day', 'month', 'year']}
            onChange={changeContractStartedAt}
            renderInput={(params: TextFieldProps) => (
              <RHFTextField
                {...params}
                name="contractStartedAt"
                error={!!errors.contractStartedAt}
                helperText={errors.contractStartedAt?.message}
              />
            )}
          />
        </Grid>

        <Grid item sm={6} md={4}>
          <DatePicker
            value={contractExpiresAt}
            label="Contract Expires At"
            views={['day', 'month', 'year']}
            onChange={changeContractExpiresAt}
            renderInput={(params: TextFieldProps) => (
              <RHFTextField
                {...params}
                name="contractExpiresAt"
                error={!!errors.contractExpiresAt}
                helperText={errors.contractExpiresAt?.message}
              />
            )}
          />
        </Grid>

        <Grid item sm={6} md={4}>
          <DatePicker
            value={quizTime}
            label="Quiz Time"
            views={['day', 'month', 'year']}
            onChange={changeQuizTime}
            renderInput={(params: TextFieldProps) => (
              <RHFTextField
                {...params}
                name="quizTime"
                error={!!errors.quizTime}
                helperText={errors.quizTime?.message}
              />
            )}
          />
        </Grid>

        <Grid item sm={6} md={4}>
          <RHFTextField
            name="certificateCode"
            label="Certificate Code"
            error={!!errors.certificateCode}
            helperText={errors.certificateCode?.message}
          />
        </Grid>

        <Grid item sm={6} md={4}>
          <RHFTextField
            name="jobTitle"
            label="Job Title"
            error={!!errors.jobTitle}
            helperText={errors.jobTitle?.message}
          />
        </Grid>

        <Grid item sm={6} md={4}>
          <RHFAutocomplete
            multiple
            name="availableShifts"
            label="Available Shifts"
            options={shiftTypes}
            ChipProps={{size: 'small'}}
            getOptionLabel={(option) => (option as ShiftTypesQueryResponseDataItem).name || ''}
          />
        </Grid>

        <Grid item sm={6} md={4}>
          <RHFAutocomplete
            multiple
            name="contractTypes"
            label="Contract Types"
            options={contractTypes}
            ChipProps={{size: 'small'}}
            getOptionLabel={(option) => (option as ContractTypesQueryResponseDataItem).name || ''}
          />
        </Grid>

        <Grid item sm={6} md={4}>
          <RHFTextField
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">%</InputAdornment>
              ),
            }}
            name="percentLengthInContract"
            label="Percent Length In Contract"
            error={!!errors.percentLengthInContract}
            helperText={errors.percentLengthInContract?.message}
          />
        </Grid>

        <Grid item sm={6} md={4}>
          <RHFTextField
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">H</InputAdornment>
              ),
            }}
            name="hourLengthInContract"
            label="Hour Length In Contract"
            error={!!errors.hourLengthInContract}
            helperText={errors.hourLengthInContract?.message}
          />
        </Grid>

        <Grid item sm={6} md={4}>
          <RHFTextField
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">EU</InputAdornment>
              ),
            }}
            name="salary"
            label="Salary"
            error={!!errors.salary}
            helperText={errors.salary?.message}
          />
        </Grid>

        <Grid item sm={6} md={4}>
          <RHFTReeSelect
            multiple
            name="sections"
            label="Sections"
            filterSelectedOptions
            ChipProps={{size: 'small'}}
            isBranch={isBranch}
            getParent={getSectionParent}
            getChildren={getSectionChildren}
            getOptionLabel={(option) => (option as SectionsQueryResponseDataItem).name || ''}
          />
        </Grid>

        <Grid item sm={6} md={4}>
          <RHFAutocomplete
            multiple
            name="nurseTypes"
            label="Nurse Types"
            options={nurseTypeOptions}
            ChipProps={{size: 'small'}}
            getOptionLabel={(option) => (option as NurseTypesQueryResponseDataItem).name || ''}
          />
        </Grid>

        {/* System Accepts DAY AmountUnit for default */}
        <Grid item sm={6} md={4}>
          <RHFTextField
            name="experienceAmount"
            label="Experience Days"
            error={!!errors.experienceAmount}
            helperText={errors.experienceAmount?.message}
          />
        </Grid>

        <Grid item sm={6} md={4}>
          <RHFAutocomplete
            multiple
            name="roles"
            label="Roles"
            options={[]}
            ChipProps={{size: 'small'}}
            getOptionLabel={(option) => upperCase(option)}
          />
        </Grid>

        <Grid item xs={12}>
          <RHFTextField
            multiline
            rows={2}
            name="limitations"
            label="limitations"
            error={!!errors.limitations}
            helperText={errors.limitations?.message}
          />
        </Grid>

      </Grid>

      <Divider sx={{my: 2}}/>

      <Stack direction="row" spacing={2} justifyContent='flex-end' mt={2}>
        <Button variant="outlined" onClick={prevStep}>
          Back
        </Button>
        <LoadingButton
          type="submit"
          loading={isSubmitting}
          variant="contained"
        >
          {isEdit ? "Update" : "Add"} Contract Info
        </LoadingButton>
      </Stack>
    </FormProvider>
  )
}