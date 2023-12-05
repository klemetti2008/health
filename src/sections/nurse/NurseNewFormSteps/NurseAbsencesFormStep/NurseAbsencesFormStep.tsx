import {
  Alert,
  Box,
  Button, Checkbox,
  Divider,
  FormControlLabel,
  Grid,
  Stack,
  TextFieldProps
} from "@mui/material";
import FormProvider, {RHFTextField} from "src/components/hook-form";
import {LoadingButton} from "@mui/lab";
import {useSnackbar} from "src/components/snackbar";
import {useDispatch} from "src/redux/store";
import {createNurseActiveStepChanged} from "src/redux/slices/nurse";
import {SyntheticEvent, useCallback, useState} from "react";
import * as Yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {CreateNurseStepsEnum} from "src/@types/redux/nurse";
import {CreateNurseSteps} from "src/sections/nurse/NurseNewFormSteps/steps";
import {
  ApiError,
  NursesCreateAbsencesRequestBody,
  NursesQueryAbsencesResponseDataItem,
} from "src/_requests/Maja";
import {DateTimePicker} from "@mui/x-date-pickers";
import Iconify from "src/components/iconify";
import {FormErrors, parseErrors} from "src/utils/errors";
import {useNursesAbsencesCreateMutation} from "src/api-hooks/nurse/useNursesAbsencesCreateMutation";
import {useNursesAbsencesIdUpdateMutation} from "src/api-hooks/nurse/useNursesAbsencesIdUpdateMutation";
import NurseAbsencesDataGrid from "src/sections/nurse/NurseNewFormSteps/NurseAbsencesFormStep/NurseAbsencesDataGrid";
import useStepData from "src/sections/nurse/hooks/useStepData";
import useIsAvailableUser from "src/sections/nurse/hooks/useAvailableUser";
import useIsAvailableNurse from "src/sections/nurse/hooks/useAvailableNurse";
import {PATH_PAGE} from "src/routes/paths";
import {useRouter} from "next/router";

type NurseAbsencesFormStepProps = {
  // ...
}

interface AbsenceFormStepValuesProps extends NursesCreateAbsencesRequestBody {
  afterSubmit?: string;
}

type AbsencesCreateRequestSchema = {
  [K in keyof NursesCreateAbsencesRequestBody]: Yup.AnySchema;
};


export default function NurseAbsencesFormStep(props: NurseAbsencesFormStepProps) {
  const dispatch = useDispatch()
  const {enqueueSnackbar} = useSnackbar();
  const router = useRouter()
  const {nurseId, userId} = useStepData()

  const [currentAbsenceForEdit, setCurrentAbsenceForEdit] = useState<NursesQueryAbsencesResponseDataItem | null>(null)
  const [startDate, setStartDate] = useState<Date | null>(null)
  const [endDate, setEndDate] = useState<Date | null>(null)
  const [isUnknownEndDate, setIsUnknownEndDate] = useState<boolean>(false)

  const {mutateAsync: createAbsence} = useNursesAbsencesCreateMutation();
  const {mutateAsync: updateAbsence} = useNursesAbsencesIdUpdateMutation();

  const nextStep = useCallback(() => {
    dispatch(createNurseActiveStepChanged(CreateNurseSteps[CreateNurseStepsEnum.Permissions]))
  }, [dispatch])

  const prevStep = useCallback(() => {
    dispatch(createNurseActiveStepChanged(CreateNurseSteps[CreateNurseStepsEnum.ContractInfo]))
  }, [dispatch])


  const AddressesSchema = Yup.object().shape<AbsencesCreateRequestSchema>({
    start_date: Yup.string().label("Start Date").required(),
    end_date: Yup.string().label("End Date"),
    reason: Yup.string().label("Reason").required(),
  });


  const defaultValues = {
    start_date: currentAbsenceForEdit?.start_date || '',
    end_date: currentAbsenceForEdit?.end_date || '',
    reason: currentAbsenceForEdit?.reason || '',
    nurseId: currentAbsenceForEdit?.nurse?.id || Number(nurseId),
    afterSubmit: '',
  } satisfies AbsenceFormStepValuesProps;

  const methods = useForm<AbsenceFormStepValuesProps>({
    resolver: yupResolver(AddressesSchema),
    defaultValues,
  });

  const {
    reset,
    setError,
    setValue,
    handleSubmit,
    formState: {errors, isSubmitting},
  } = methods;

  const handleSetCurrentAbsenceForEdit = useCallback((absence: NursesQueryAbsencesResponseDataItem) => {
    setCurrentAbsenceForEdit(absence)
    setValue('start_date', absence.start_date)
    if (absence.start_date) setStartDate(new Date(absence.start_date))
    setValue('end_date', absence.end_date)
    if (absence.end_date) setEndDate(new Date(absence.end_date))
    setValue('reason', absence.reason)

    if (!absence.end_date) setIsUnknownEndDate(true)
  }, [setValue])

  const handleCancelAbsenceEdit = () => {
    setCurrentAbsenceForEdit(null)
    setStartDate(null)
    setEndDate(null)
    setIsUnknownEndDate(false)
    reset()
  }

  const changeStartDate = (date: Date | null) => {
    console.log('?start date', date)
    if (date instanceof Date && !Number.isNaN(date.getTime())) {
      setStartDate(date);
      setValue('start_date', date.toISOString())
    } else {
      setValue('start_date', '')
      setStartDate(null);
      setError("start_date", {
        type: 'manual',
        message: 'Start date is invalid',
      });
    }
  };

  const changeEndDate = (date: Date | null) => {
    if (date instanceof Date && !Number.isNaN(date.getTime())) {
      setEndDate(date);
      setValue('end_date', date?.toISOString())
    } else {
      setEndDate(null);
      setError("end_date", {
        type: 'manual',
        message: 'End date is invalid',
      });
    }
  };

  const toggleIsUnknownEndDate = (event: SyntheticEvent<Element, Event>, checked: boolean) => {
    if (checked) {
      setEndDate(null)
      setValue('end_date', '')
    }
    setIsUnknownEndDate(checked)
  }

  // TODO: decouple this
  const setErrors = (errs: FormErrors) => {
    Object.keys(errs).forEach((field: string) => {
      setError(field as keyof AbsenceFormStepValuesProps, {
        type: 'manual',
        message: errs[field],
      });
    });
  };

  const onSubmit = async (data: AbsenceFormStepValuesProps) => {
    console.log('absence submit data', data)
    try {
      if (!currentAbsenceForEdit) {
        await createAbsence({
          requestBody: data,
        });
        enqueueSnackbar(`Absence Added Successfully`, {variant: 'success'});
      } else {
        if (!currentAbsenceForEdit.id) throw new Error('Address Id is missing')
        await updateAbsence({id: currentAbsenceForEdit.id, requestBody: data});
        enqueueSnackbar(`Absence Updated Successfully`, {variant: 'success'});
      }
      reset();
    } catch (error) {
      if (error instanceof ApiError) {
        setErrors(parseErrors(error.body.errors));
        setError('afterSubmit', {
          message: error.body.message || "We couldn't create the Absence.",
        });
      } else {
        setError('afterSubmit', {
          message: error.message || "We couldn't create the Absence. Please Contact Support.",
        });
      }
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
            <DateTimePicker
              value={startDate}
              label="Start Date"
              views={['day', 'month', 'year', 'hours', 'minutes']}
              onChange={changeStartDate}
              renderInput={(params: TextFieldProps) => (
                <RHFTextField
                  {...params}
                  name="start_date"
                  error={!!errors.start_date}
                  helperText={errors.start_date?.message}
                />
              )}
            />
          </Grid>

          <Grid item sm={6} md={6}>
            <Stack>
              <DateTimePicker
                value={endDate}
                label="End Date"
                onChange={changeEndDate}
                disabled={isUnknownEndDate}
                views={['day', 'month', 'year', 'hours', 'minutes']}
                renderInput={(params: TextFieldProps) => (
                  <RHFTextField
                    {...params}
                    name="end_date"
                    error={!!errors.end_date}
                    helperText={errors.end_date?.message}
                  />
                )}
              />
              <FormControlLabel
                control={<Checkbox checked={isUnknownEndDate}/>}
                onChange={toggleIsUnknownEndDate}
                sx={{pl: 0.5}} label="Unknown End Date"
              />
            </Stack>
          </Grid>

          <Grid item sm={12} md={12}>
            <RHFTextField name="reason" label="Reason" multiline rows={2}/>
          </Grid>

        </Grid>
        <Stack direction="row" alignItems="center" my={2} spacing={2}>
          <Divider sx={{flexGrow: 1}}/>
          {currentAbsenceForEdit && <Button
              size="small"
              type="button"
              variant="outlined"
              onClick={handleCancelAbsenceEdit}
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
            {currentAbsenceForEdit ? "Update" : "Add"} Absence
          </LoadingButton>
        </Stack>
      </FormProvider>

      <NurseAbsencesDataGrid setCurrentAbsenceForEditHandler={handleSetCurrentAbsenceForEdit}/>

      <Divider sx={{my: 2}}/>

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