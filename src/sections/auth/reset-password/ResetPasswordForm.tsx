import * as Yup from 'yup';
// next
import {useRouter} from 'next/router';
// form
import {yupResolver} from '@hookform/resolvers/yup';
import {useForm} from 'react-hook-form';
// @mui
import {LoadingButton} from '@mui/lab';
// components
import FormProvider, {RHFTextField} from 'src/components/hook-form';
import {useEffect, useState} from 'react';
import {Alert, IconButton, InputAdornment, Stack} from '@mui/material';
import Iconify from 'src/components/iconify';
import majaClient from "src/_clients/MajaClient";
import {exchangeCodeSelector, loginValuesSelector} from "src/redux/slices/auth";
import {useSelector} from "src/redux/store";
import {useSnackbar} from "src/components/snackbar";
import {PATH_AUTH} from "src/routes/paths";

// ----------------------------------------------------------------------

type ResetPasswordFormValuesProps = {
  newPassword: string;
  confirmPassword: string;
  afterSubmit?: string;
};

export default function ResetPasswordForm() {
  const {push} = useRouter();
  const {enqueueSnackbar} = useSnackbar();
  const [showPassword, setShowPassword] = useState(false);

  const ResetPasswordSchema = Yup.object().shape({
    newPassword: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
    confirmPassword: Yup.string()
      .required('Confirm password is required')
      .oneOf([Yup.ref('newPassword')], 'Passwords must match'),
  });

  const methods = useForm<ResetPasswordFormValuesProps>({
    resolver: yupResolver(ResetPasswordSchema),
    defaultValues: {newPassword: '', confirmPassword: ''},
  });

  const {
    handleSubmit,
    setError,
    formState: {isSubmitting, errors},
  } = methods;

  const {email} = useSelector(loginValuesSelector)
  const exchangeCode = useSelector(exchangeCodeSelector)

  useEffect(() => {
    if (!email || !exchangeCode) {
      push(PATH_AUTH.login);
    }
  }, [email, exchangeCode, push])

  const onSubmit = async (data: ResetPasswordFormValuesProps) => {
    console.log('data', data)
    const {newPassword} = data;
    try {
      await majaClient.put('/users/reset-password', {
        email,
        exchangeCode,
        newPassword,
      })
      enqueueSnackbar('Reset password success! Please Sign In again.');
      await push(PATH_AUTH.login);
    } catch (error) {
      console.error(error);
      setError('afterSubmit', {
        message: error.message || "Reset password failed! Please try again later.",
      });
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      {errors.afterSubmit && (
        <Alert severity="error" sx={{mb: 2}}>
          {errors.afterSubmit.message}
        </Alert>
      )}
      <Stack spacing={3}>
        <RHFTextField
          name="newPassword"
          label="New Password"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'}/>
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <RHFTextField
          name="confirmPassword"
          label="Confirm New Password"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'}/>
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>
      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitting}
        sx={{mt: 3}}
      >
        Submit
      </LoadingButton>
    </FormProvider>
  );
}
