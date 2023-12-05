import {Alert, Box, Button, Divider, Grid, Stack} from "@mui/material";
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
  AddressesCreateRequestBody, AddressesCreateRequestBodyCity, AddressesCreateRequestBodyStreet,
  AddressesQueryResponseDataItem,
  ApiError,
  CitiesQueryResponseDataItem, StreetsQueryResponseDataItem,
} from "src/_requests/Maja";
import Iconify from "src/components/iconify";
import NurseAddressesDataGrid from "src/sections/nurse/NurseNewFormSteps/NurseAddressesFromStep/NurseAddressesDataGrid";
import {useAddressesCreateMutation} from "src/api-hooks/address/useAddressesCreateMutation";
import {FormErrors, parseErrors} from "src/utils/errors";
import {useAddressesIdUpdateMutation} from "src/api-hooks/address/useAddressesIdUpdateMutation";
import {useCitiesQuery} from "src/api-hooks/city/useCitiesQuery";
import {useStreetsQuery} from "src/api-hooks/street/useStreetsQuery";
import useStepData from "src/sections/nurse/hooks/useStepData";
import {PATH_PAGE} from "src/routes/paths";
import useIsAvailableUser from "src/sections/nurse/hooks/useAvailableUser";
import useIsAvailableNurse from "src/sections/nurse/hooks/useAvailableNurse";
import {useRouter} from "next/router";

type AddressesFormStepProps = {
  // ...
}

interface AddressFormStepValuesProps extends AddressesCreateRequestBody {
  afterSubmit?: string;
}

type AddressesCreateRequestSchema = {
  [K in keyof AddressesCreateRequestBody]: Yup.AnySchema;
};


export default function NurseAddressesFormStep(props: AddressesFormStepProps) {
  const dispatch = useDispatch()
  const {enqueueSnackbar} = useSnackbar();

  const router = useRouter()

  const {nurseId, userId} = useStepData()

  const [currentAddressForEdit, setCurrentAddressForEdit] = useState<AddressesQueryResponseDataItem | null>(null)

  const {mutateAsync: createAddress} = useAddressesCreateMutation();
  const {mutateAsync: updateAddress} = useAddressesIdUpdateMutation();

  const nextStep = useCallback(() => {
    dispatch(createNurseActiveStepChanged(CreateNurseSteps[CreateNurseStepsEnum.Permissions]))
  }, [dispatch])

  const prevStep = useCallback(() => {
    dispatch(createNurseActiveStepChanged(CreateNurseSteps[CreateNurseStepsEnum.ContractInfo]))
  }, [dispatch])


  const AddressesSchema = Yup.object().shape<AddressesCreateRequestSchema>({
    name: Yup.string().label("Name").min(2).max(200).required(),
    street: Yup.object<AddressesCreateRequestBodyStreet>().label("Street").required(),
    city: Yup.object<AddressesCreateRequestBodyCity>().label("City").required(),
    postalCode: Yup.string().label("Postal Code").min(2).max(200).required(),
    buildingNumber: Yup.string().label("Building Number").min(2).max(200).required(),
  });

  const defaultValues = {
    name: currentAddressForEdit?.name || '',
    street: currentAddressForEdit?.street || undefined,
    city: currentAddressForEdit?.city || undefined,
    nurseId: currentAddressForEdit?.nurse?.id || Number(nurseId),
    postalCode: currentAddressForEdit?.postalCode || '',
    buildingNumber: currentAddressForEdit?.buildingNumber || '',
    afterSubmit: '',
  } satisfies AddressFormStepValuesProps;

  const methods = useForm<AddressFormStepValuesProps>({
    resolver: yupResolver(AddressesSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    setError,
    setValue,
    handleSubmit,
    formState: {errors, isSubmitting},
  } = methods;

  const handleSetCurrentAddressForEdit = useCallback((address: AddressesQueryResponseDataItem) => {
    setCurrentAddressForEdit(address)
    setValue('name', address.name)
    setValue('street', address.street)
    setValue('city', address.city)
    setValue('postalCode', address.postalCode)
    setValue('buildingNumber', address.buildingNumber)
  }, [setValue])

  const handleCancelAddressEdit = () => {
    setCurrentAddressForEdit(null)
    reset()
  }

  const {city} = watch()

  const {data: citiesDataResult} = useCitiesQuery({filters: {}})
  const cities = citiesDataResult?.data?.items || []

  const {data: streetsDataResult} = useStreetsQuery({
    filters: {
      // cityId: city?.id || 0
    }
  }, {
    // enabled: !!city?.id
  })
  const streets = streetsDataResult?.data?.items || []

  const setErrors = (errs: FormErrors) => {
    Object.keys(errs).forEach((field: string) => {
      setError(field as keyof AddressFormStepValuesProps, {
        type: 'manual',
        message: errs[field],
      });
    });
  };

  const onSubmit = async (data: AddressFormStepValuesProps) => {
    console.log(data)
    try {
      if (!currentAddressForEdit) {
        const addressResult = await createAddress({requestBody: data});
        const name = addressResult.data?.name || '';
        enqueueSnackbar(`${name} Address Added Successfully`, {variant: 'success'});
      } else {
        if (!currentAddressForEdit.id) throw new Error('Address Id is missing')
        const addressResult = await updateAddress({id: currentAddressForEdit.id, requestBody: data});
        const name = addressResult.data?.name || '';
        enqueueSnackbar(`${name} Address Updated Successfully`, {variant: 'success'});
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

  const {userFound, isLoading: isUserFindLoading} = useIsAvailableUser(userId)
  const {nurseFound, isLoading: isNurseFindLoading} = useIsAvailableNurse(nurseId)

  if (isUserFindLoading ||  isNurseFindLoading) {
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
          <Grid item sm={6} md={3}>
            <RHFTextField name="name" label="Name"/>
          </Grid>

          <Grid item sm={6} md={2}>
            <RHFAutocomplete
              name="city"
              label="City"
              options={cities}
              ChipProps={{size: 'small'}}
              getOptionLabel={(option) => (option as CitiesQueryResponseDataItem).name || ''}
            />
          </Grid>

          <Grid item sm={6} md={3}>
            <RHFAutocomplete
              name="street"
              label="Street"
              options={streets}
              disabled={!city?.id}
              ChipProps={{size: 'small'}}
              getOptionLabel={(option) => (option as StreetsQueryResponseDataItem).name || ''}
            />
          </Grid>

          <Grid item sm={6} md={2}>
            <RHFTextField name="buildingNumber" label="Building Number"/>
          </Grid>

          <Grid item sm={6} md={2}>
            <RHFTextField name="postalCode" label="Postal Code"/>
          </Grid>
        </Grid>
        <Stack direction="row" alignItems="center" my={2} spacing={2}>
          <Divider sx={{flexGrow: 1}}/>
          {currentAddressForEdit && <Button
              size="small"
              type="button"
              variant="outlined"
              onClick={handleCancelAddressEdit}
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
            {currentAddressForEdit ? "Update" : "Add"} Address
          </LoadingButton>
        </Stack>
      </FormProvider>

      <NurseAddressesDataGrid setCurrentAddressForEditHandler={handleSetCurrentAddressForEdit}/>

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