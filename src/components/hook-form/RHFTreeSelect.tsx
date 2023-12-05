// form
import {useFormContext, Controller} from 'react-hook-form';
// @mui
import {TextField} from '@mui/material';
import {TreeSelect, TreeSelectProps} from "src/components/mui-tree-select";

// ----------------------------------------------------------------------

interface Props<
  T,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined,
> extends TreeSelectProps<T, Multiple, DisableClearable, FreeSolo> {
  name: string;
  label?: string;
  helperText?: React.ReactNode;
  getChildren: (node: T | null) => T[],
  getParent: (node: T) => T | null,
}

export default function RHFTReeSelect<
  T,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined
>({
  name,
  label,
  helperText,
  getParent,
  getChildren,
  ...other
}: Omit<Props<T, Multiple, DisableClearable, FreeSolo>, 'renderInput'>) {
  const {control, setValue} = useFormContext();


  return (
    <Controller
      name={name}
      control={control}
      render={({field, fieldState: {error}}) => (
        <TreeSelect
          {...field}
          getChildren={getChildren}
          getParent={getParent}
          onChange={(event, newValue) => setValue(name, newValue, {shouldValidate: true})}
          renderInput={(params) => (
            <TextField
              label={label}
              error={!!error}
              helperText={error ? error?.message : helperText}
              {...params}
            />
          )}
          {...other}
        />
      )}
    />
  );
}
