import {useEffect, useState} from 'react';
import * as Yup from 'yup';
// next
import {useRouter} from 'next/router';
// form
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
// @mui
import {Stack, IconButton, InputAdornment, FormHelperText, Link, Button, Alert, Typography} from '@mui/material';
import {LoadingButton} from '@mui/lab';

// routes
import {PATH_DASHBOARD} from 'src/routes/paths';
// components
import Iconify from 'src/components/iconify';
import {useSnackbar} from 'src/components/snackbar';
import FormProvider, {RHFTextField} from 'src/components/hook-form';
import majaClient from "src/_clients/MajaClient";
import {useAuthContext} from "src/auth/useAuthContext";
import {SSOClient} from "src/_clients";
import {OtpReasons, OtpTargets} from "src/@types/auth";
import {
  exchangeCodeChanged,
  exchangeCodeSelector,
  otpValuesChanged
} from "src/redux/slices/auth";
import VerifyCodeDialog from "../verify-code/VerifyCodeDialog";
import {useDispatch, useSelector} from "../../../redux/store";

// ----------------------------------------------------------------------

type FormValuesProps = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
  afterSubmit?: string;
};

export default function ChangePasswordForm() {
  const {push} = useRouter();
  const {initialize} = useAuthContext();
  const {enqueueSnackbar} = useSnackbar();
  const {user} = useAuthContext();

  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);
  const [verifyDialogOpen, setVerifyDialogOpen] = useState(false);

  const exchangeCode = useSelector(exchangeCodeSelector);

  const VerifyCodeSchema = Yup.object().shape({
    currentPassword: Yup.string().required('Current Password is required'),
    newPassword: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
    confirmPassword: Yup.string()
      .required('Confirm password is required')
      .oneOf([Yup.ref('newPassword')], 'Passwords must match'),
  });

  const defaultValues = {
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    afterSubmit: '',
  };

  const methods = useForm({
    mode: 'onChange',
    resolver: yupResolver(VerifyCodeSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    setError,
    formState: {isSubmitting, errors},
  } = methods;

  const onSubmit = async (data: FormValuesProps) => {
    const {newPassword, currentPassword} = data;
    try {
      // with or without exchange code send the request and initialize for sake of PasswordGuard component
      await majaClient.put('/users/change-password', {
        newPassword,
        exchangeCode,
        currentPassword,
      });

      enqueueSnackbar('Change password success!');

      await initialize()

      await push(PATH_DASHBOARD.root);
    } catch (error) {
      setError('afterSubmit', {
        message: error.message || "Failed to change password",
      });
      console.error(error);
    }
  };

  const handleOpenVerifyDialog = () => {
    setVerifyDialogOpen(true);
  }

  const handleCloseVerifyDialog = () => {
    setVerifyDialogOpen(false);
  }

  useEffect(() => {
    if (exchangeCode) {
      dispatch(exchangeCodeChanged(""));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const sendVerifyCode = async () => {
    console.log("sendVerifyCode");
    try {
      dispatch(exchangeCodeChanged(""));

      const response = await SSOClient.post('/otp/send', {
        password: "",
        username: user?.email,
        reason: OtpReasons.ChangePassword,
        target: OtpTargets.Email,
      });

      const {token, coolDown} = response.data.data;

      dispatch(otpValuesChanged({reason: OtpReasons.ChangePassword, token, coolDown}));

      enqueueSnackbar('Code sent to your email', {variant: 'success'});
      handleOpenVerifyDialog();
    } catch (error) {
      console.error(error);
      enqueueSnackbar('Failed to send code', {variant: 'error'});
    }
  }

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      {!!errors.afterSubmit && (
        <Alert severity="error" sx={{mb: 2}}>
          {errors.afterSubmit.message}
        </Alert>
      )}
      <VerifyCodeDialog open={verifyDialogOpen} onClose={handleCloseVerifyDialog}/>
      <Stack spacing={3}>
        {/* TODO: if otp is enabled for change password open dialog box to
            send otp ang get exchange code to send the ex-code along with change
            password api */}

        {/* FIXME: make show password work separately for each input  */}
        <RHFTextField
          name="currentPassword"
          label="Current Password"
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

        {exchangeCode ?
          <Typography variant="body2" sx={{color: 'success.main', mt: 1}}>
            You are verified to change password
          </Typography> :

          <Button
            fullWidth
            sx={{mt: 3}}
            size="large"
            type="button"
            variant="contained"
            color={exchangeCode ? "success" : "primary"}
            onClick={!exchangeCode ? sendVerifyCode : undefined}
          >
            Send Verification Code
          </Button>}

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          disabled={!exchangeCode}
          loading={isSubmitting}
          sx={{mt: 3}}
        >
          Change Password
        </LoadingButton>
      </Stack>


    </FormProvider>
  );
}
