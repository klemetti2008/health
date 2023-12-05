import * as Yup from 'yup';
// next
import { Alert } from '@mui/material';
import { useRouter } from 'next/router';
// form
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
// @mui
import { LoadingButton } from '@mui/lab';
// routes
import { useSnackbar } from 'src/components/snackbar';
import { PATH_AUTH } from 'src/routes/paths';
// components
import FormProvider, { RHFTextField } from 'src/components/hook-form';
import { SSOClient } from 'src/_clients';
import { OtpReasons, OtpTargets } from 'src/@types/auth';
import { useDispatch } from 'src/redux/store';
import { loginValuesChanged, otpValuesChanged } from 'src/redux/slices/auth';

// ----------------------------------------------------------------------

type RequestFormValuesProps = {
  email: string;
  afterSubmit?: string;
};

export default function RequestForm() {
  const router = useRouter();

  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const RequestSchema = Yup.object().shape({
    email: Yup.string().required('Email is required').email('Email must be a valid email address'),
  });

  const methods = useForm<RequestFormValuesProps>({
    resolver: yupResolver(RequestSchema),
    defaultValues: { email: '' },
  });

  const {
    reset,
    setError,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = methods;

  const onSubmit = async (data: RequestFormValuesProps) => {
    const { email } = data;

    const reason = OtpReasons.ResetPassword;

    try {
      const response = await SSOClient.post('/otp/send', {
        reason,
        password: '',
        username: email,
        target: OtpTargets.Email,
      });

      const { token, coolDown } = response.data.data;

      dispatch(loginValuesChanged({ email, password: '', remember: false }));

      dispatch(otpValuesChanged({ reason, token, coolDown }));

      enqueueSnackbar('Code sent to your email', { variant: 'success' });

      reset();

      await router.push(PATH_AUTH.verify);
    } catch (error) {
      console.error(error);
      setError('afterSubmit', {
        message: error.message || "We couldn't send you an code. Please try again later.",
      });
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      {!!errors.afterSubmit && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {errors.afterSubmit.message}
        </Alert>
      )}
      <RHFTextField name="email" label="Email address" />

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitting}
        sx={{ mt: 3 }}
      >
        Send Request
      </LoadingButton>
    </FormProvider>
  );
}
