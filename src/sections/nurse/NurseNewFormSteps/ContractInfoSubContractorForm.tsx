import {Box, Checkbox, Collapse, Divider, FormControlLabel, Grid, Stack} from "@mui/material";
import {RHFAutocomplete, RHFTextField} from "src/components/hook-form";
import {PaymentTypesQueryResponseDataItem, VehiclesQueryResponseDataItem} from "src/_requests/Maja";
import {useVehiclesQuery} from "src/api-hooks/vehicle/useVehiclesQuery";
import {usePaymenttypesQuery} from "src/api-hooks/paymenttype/usePaymenttypesQuery";

type NurseNewFormProps = {
  open: boolean
  toggleOpen: () => void
}

export default function ContractInfoSubContractorForm({open, toggleOpen}: NurseNewFormProps) {
  const {data: paymentTypesResult} = usePaymenttypesQuery({filters: {}})
  const paymentTypeItems = paymentTypesResult?.data?.items || []

  const {data: userVehiclesResult} = useVehiclesQuery({filters: {}})
  const vehicleItems = userVehiclesResult?.data?.items || []

  return (
    <Stack>
      <FormControlLabel
        sx={{pl: 1}}
        control={<Checkbox checked={open} onClick={toggleOpen}/>}
        label="Sub Contractor"
      />
      <Collapse in={open}>
        <Grid container spacing={2} sx={{py: 1}}>
          <Grid item sm={6}>
            <RHFTextField name="companyRegistrationNumber" label="Company Registration Number"/>
          </Grid>

          <Grid item sm={6}>
            <RHFAutocomplete
              name="paymentType"
              label="Payment Type"
              isOptionEqualToValue={(option: PaymentTypesQueryResponseDataItem, value: PaymentTypesQueryResponseDataItem) => option.id === value.id}
              options={paymentTypeItems}
              ChipProps={{size: 'small'}}
              getOptionLabel={(option) => (option as PaymentTypesQueryResponseDataItem).name || ""}
            />
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Box p={2}>
            {vehicleItems.map((vehicle: VehiclesQueryResponseDataItem) => (vehicle.brand)).join(', ') || 'No vehicles'}
          </Box>
        </Grid>
      </Collapse>

      <Divider sx={{mt: 2, mb: 1}}/>
    </Stack>
  )
}