// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import {MuiTelInput, MuiTelInputProps} from "mui-tel-input";

// ----------------------------------------------------------------------

type Props = MuiTelInputProps & {
  name: string;
};

export default function RHFTelInput({ name, helperText, ...other }: Props) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <MuiTelInput
          {...field}
          fullWidth
          value={typeof field.value === 'number' && field.value === 0 ? '' : field.value}
          error={!!error}
          helperText={error ? error?.message : helperText}
          {...other}
        />
      )}
    />
  );
}
