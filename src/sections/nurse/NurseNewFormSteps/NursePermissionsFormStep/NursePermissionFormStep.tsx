import {Alert, Box, Button, Divider, Grid, Stack, TextFieldProps} from "@mui/material";
import FormProvider, {RHFAutocomplete, RHFTextField} from "src/components/hook-form";
import {LoadingButton} from "@mui/lab";
import {useSnackbar} from "src/components/snackbar";
import {useDispatch} from "src/redux/store";
import {createNurseActiveStepChanged} from "src/redux/slices/nurse";
import {useCallback, useState} from "react";
import * as Yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {CreateNurseStepsEnum} from "src/@types/redux/nurse";
import {CreateNurseSteps} from "src/sections/nurse/NurseNewFormSteps/steps";
import {
  ApiError,
  PermissionsQueryResponseDataItem,
  NursesCreatePermissionsRequestBody,
  NursesQueryPermissionsResponseDataItem,
  NursesCreatePermissionsRequestBodyPermission,
} from "src/_requests/Maja";
import Iconify from "src/components/iconify";
import {FormErrors, parseErrors} from "src/utils/errors";
import {usePermissionsQuery} from "src/api-hooks/permission/usePermissionsQuery";
import {DatePicker} from "@mui/x-date-pickers";
import NursePermissionsDataGrid
  from "src/sections/nurse/NurseNewFormSteps/NursePermissionsFormStep/NursePermissionsDataGrid";
import {useNursesPermissionsIdUpdateMutation} from "src/api-hooks/nurse/useNursesPermissionsIdUpdateMutation";
import useStepData from "src/sections/nurse/hooks/useStepData";
import {useNursesPermissionsCreateMutation} from "src/api-hooks/nurse/useNursesPermissionsCreateMutation";
import useIsAvailableUser from "src/sections/nurse/hooks/useAvailableUser";
import useIsAvailableNurse from "src/sections/nurse/hooks/useAvailableNurse";
import {PATH_PAGE} from "src/routes/paths";
import {useRouter} from "next/router";

type PermissionFormStepProps = {
  // ...
}

interface PermissionFormStepValuesProps extends NursesCreatePermissionsRequestBody {
  afterSubmit?: string;
}

type NursePermissionCreateRequestSchema = {
  [K in keyof NursesCreatePermissionsRequestBody]: Yup.AnySchema;
};

export default function NursePermissionFormStep(props: PermissionFormStepProps) {
  const dispatch = useDispatch()
  const {enqueueSnackbar} = useSnackbar();
  const router = useRouter()
  const {nurseId, userId} = useStepData()
  const [expireDate, setExpireDate] = useState<Date | null>(null)
  const [currentPermissionForEdit, setCurrentPermissionForEdit] = useState<NursesQueryPermissionsResponseDataItem | null>(null)

  const {mutateAsync: createNursePermission} = useNursesPermissionsCreateMutation();
  const {mutateAsync: updateNursePermission} = useNursesPermissionsIdUpdateMutation();

  const nextStep = useCallback(() => {
    dispatch(createNurseActiveStepChanged(CreateNurseSteps[CreateNurseStepsEnum.Permissions]))
  }, [dispatch])

  const prevStep = useCallback(() => {
    dispatch(createNurseActiveStepChanged(CreateNurseSteps[CreateNurseStepsEnum.ContractInfo]))
  }, [dispatch])


  const PermissionSchema = Yup.object().shape<NursePermissionCreateRequestSchema>({
    permission: Yup.object<NursesCreatePermissionsRequestBodyPermission>().label("Permission").required(),
    expire_date: Yup.string().label("Expire Date").required(),
  });

  const defaultValues = {
    nurseId: currentPermissionForEdit?.nurseId || Number(nurseId),
    expire_date: currentPermissionForEdit?.expire_date || "",
    permission: currentPermissionForEdit?.permission || undefined,
    afterSubmit: "",
  } satisfies PermissionFormStepValuesProps;

  const methods = useForm<PermissionFormStepValuesProps>({
    resolver: yupResolver(PermissionSchema),
    defaultValues,
  });

  const {
    reset,
    setError,
    setValue,
    handleSubmit,
    formState: {errors, isSubmitting},
  } = methods;

  const handleSetCurrentPermissionForEdit = useCallback((nursePermission: NursesQueryPermissionsResponseDataItem) => {
    setCurrentPermissionForEdit(nursePermission)
    if (nursePermission.expire_date) setExpireDate(new Date(nursePermission.expire_date))
    setValue("nurseId", nursePermission.nurseId)
    setValue('permission', nursePermission.permission)
    setValue('expire_date', nursePermission.expire_date)
  }, [setValue])

  const handleCancelPermissionEdit = () => {
    setCurrentPermissionForEdit(null)

    reset()
  }

  const {data: permissionsDataResult} = usePermissionsQuery({notOwnerNurseId: Number(nurseId), filters: {}})
  const permissions = permissionsDataResult?.data?.items || []

  const setErrors = (errs: FormErrors) => {
    Object.keys(errs).forEach((field: string) => {
      setError(field as keyof PermissionFormStepValuesProps, {
        type: 'manual',
        message: errs[field],
      });
    });
  };

  const onSubmit = async (data: PermissionFormStepValuesProps) => {
    console.log(data)
    try {
      if (!currentPermissionForEdit) {
        const nursePermissionResult = await createNursePermission({requestBody: data})
        const name = nursePermissionResult.data?.permission?.name || "Permission"
        enqueueSnackbar(`${name} Added Successfully`, {variant: 'success'});
      } else {
        if (!currentPermissionForEdit.id) throw new Error('Permission Id is missing')
        const nursePermissionResult = await updateNursePermission({id: currentPermissionForEdit.id, requestBody: data});
        const name = nursePermissionResult.data?.permission?.name || "Permission"
        enqueueSnackbar(`${name} Updated Successfully`, {variant: 'success'});
      }
      reset();
    } catch (error) {
      console.dir(error.body);
      if (error instanceof ApiError) {
        setErrors(parseErrors(error.body.errors));
        setError('afterSubmit', {
          message: error.body.message || "We couldn't create the address.",
        });
      } else {
        setError('afterSubmit', {
          message: error.message || "We couldn't create the address. Please Contact Support.",
        });
      }
    }
  }

  const changeExpireDate = (date: Date | null) => {
    if (date instanceof Date && !Number.isNaN(date.getTime())) {
      setExpireDate(date)
      setValue('expire_date', date.toISOString())
    } else {
      setExpireDate(null)
      setValue('expire_date', '')
      setError("expire_date", {
        type: 'manual',
        message: 'Expire Date is invalid',
      });
    }
  }

  const {userFound, isLoading: isUserFindLoading} = useIsAvailableUser(userId)
  const {nurseFound, isLoading: isNurseFindLoading} = useIsAvailableNurse(nurseId)

  if (isUserFindLoading || isNurseFindLoading) {
    return <div>loading</div>
  }

  if (!userFound || !nurseFound) {
    router.push(PATH_PAGE.page404)
    return null
  }


  return (
    <Box>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        {!!errors.afterSubmit && <Alert severity="error" sx={{mb: 2}}>{errors.afterSubmit.message}</Alert>}

        <Grid container spacing={2} sx={{py: 1}}>
          <Grid item sm={6} md={6}>
            <RHFAutocomplete
              name="permission"
              label="Permission"
              options={permissions}
              ChipProps={{size: 'small'}}
              getOptionLabel={(option) => (option as PermissionsQueryResponseDataItem).name || ''}
            />
          </Grid>

          <Grid item sm={6} md={6}>
            <DatePicker
              value={expireDate}
              label="Expire Date"
              views={['day', 'month', 'year']}
              onChange={changeExpireDate}
              renderInput={(params: TextFieldProps) => (
                <RHFTextField
                  {...params}
                  name="expire_date"
                  error={!!errors.expire_date}
                  helperText={errors.expire_date?.message}
                />
              )}
            />
          </Grid>

        </Grid>

        <Stack direction="row" alignItems="center" my={2} spacing={2}>
          <Divider sx={{flexGrow: 1}}/>
          {currentPermissionForEdit && <Button
              size="small"
              type="button"
              variant="outlined"
              onClick={handleCancelPermissionEdit}
          >
              Cancel
          </Button>}
          <LoadingButton
            sx={{ml: 2}}
            size="small"
            type="submit"
            variant="contained"
            loading={isSubmitting}
            endIcon={<Iconify icon='material-symbols:add'/>}>
            {currentPermissionForEdit ? "Update" : "Add"} Permission
          </LoadingButton>
        </Stack>
      </FormProvider>

      <NursePermissionsDataGrid setCurrentNursePermissionForEditHandler={handleSetCurrentPermissionForEdit}/>

      <Stack direction="row" spacing={2} justifyContent="flex-end">
        <Button variant="outlined" onClick={prevStep}>
          Back
        </Button>
        <Button
          variant="contained"
          onClick={nextStep}
        >
          Next
        </Button>
      </Stack>

    </Box>
  )
}