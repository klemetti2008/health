import * as Yup from 'yup';
import {Stack, Link, Box, Alert, FormHelperText} from '@mui/material';
import {LoadingButton} from '@mui/lab';
import useSecondCountdown from 'src/hooks/useSecondCountdown';
import {useForm} from 'react-hook-form';
// import { useTranslation } from 'react-i18next';
import {RHFCodes} from 'src/components/hook-form';
import FormProvider from 'src/components/hook-form/FormProvider';
import {yupResolver} from '@hookform/resolvers/yup';
import {useAuthContext} from 'src/auth/useAuthContext';
import {SSOClient} from 'src/_clients';
import {useDispatch, useSelector} from 'src/redux/store';
import {
  exchangeCodeChanged,
  loginValuesSelector,
  otpValuesChanged,
  OtpValuesSelector as otpValuesSelector,
} from 'src/redux/slices/auth';
import {OtpReasons, OtpTargets} from 'src/@types/auth';
import {useSnackbar} from 'src/components/snackbar';
import {PATH_AUTH, PATH_DASHBOARD} from 'src/routes/paths';
import {useRouter} from 'next/router';

type VerifyCodeFormValuesProps = {
  code1: string;
  code2: string;
  code3: string;
  code4: string;
  code5: string;
  afterSubmit?: string;
};

export default function VerifyCodeForm() {
  const router = useRouter();
  const dispatch = useDispatch();
  const {enqueueSnackbar} = useSnackbar();

  // const { t } = useTranslation('auth', { keyPrefix: 'login.verifyCodeForm' });

  const {coolDown, reason, token} = useSelector(otpValuesSelector);
  const {email, password, remember} = useSelector(loginValuesSelector);

  const {countdown: countDown, restart: restartTimer} = useSecondCountdown({init: coolDown});

  const {login} = useAuthContext();

  const VerifyCodeSchema = Yup.object().shape({
    code1: Yup.string().required('Code is required'),
    code2: Yup.string().required('Code is required'),
    code3: Yup.string().required('Code is required'),
    code4: Yup.string().required('Code is required'),
    code5: Yup.string().required('Code is required'),
  });

  const defaultValues = {
    code1: '',
    code2: '',
    code3: '',
    code4: '',
    code5: '',
  };

  const methods = useForm<VerifyCodeFormValuesProps>({
    mode: 'onChange',
    resolver: yupResolver(VerifyCodeSchema),
    defaultValues,
    // criteriaMode: 'all',
  });

  const {
    setError,
    handleSubmit,
    reset,
    formState: {isSubmitting, errors},
  } = methods;

  const reSendCode = async () => {
    try {
      const response = await SSOClient.post('/otp/send', {
        password,
        username: email,
        reason: OtpReasons.Login,
        target: OtpTargets.Email,
      });

      const {data} = response.data;

      dispatch(
        otpValuesChanged({reason: OtpReasons.Login, token: data.token, coolDown: data.coolDown})
      );

      // show snackbar success
      enqueueSnackbar('OTP sent to your email', {variant: 'success'});
      reset();
      restartTimer(data.coolDown);
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = async (data: VerifyCodeFormValuesProps) => {
    const code = Object.values(data).join('');

    try {
      const response = await SSOClient.post('/otp/verify', {
        code,
        token,
      });

      const {exchangeCode} = response.data.data;

      dispatch(exchangeCodeChanged(exchangeCode));

      if (reason === OtpReasons.Login) {
        await login(email, password, exchangeCode, remember);
      }
      reset();

      if (reason === OtpReasons.Login) {
        await router.push(PATH_DASHBOARD.root);
      }
      if (reason === OtpReasons.ResetPassword) {
        await router.push(PATH_AUTH.resetPassword);
      }
    } catch (error) {
      console.log(error);
      const someKey = Object.keys(error.data)?.[0];

      setError('afterSubmit', {
        message:
          error.data?.[someKey]?.[0] || error.message || 'Verification failed. Please try again.',
      });
    }
  };

  const resendAllowed = Boolean(countDown === 0);

  const handleComplete = () => {
    handleSubmit(onSubmit)();
  }

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack>
        {errors.afterSubmit && (
          <Alert severity="error" sx={{mb: 2}}>
            {errors.afterSubmit.message}
          </Alert>
        )}

        <Stack spacing={2}>
          <RHFCodes keyName="code" inputs={['code1', 'code2', 'code3', 'code4', 'code5']} onComplete={
            handleComplete
          }/>

          {(!!errors.code1 ||
            !!errors.code2 ||
            !!errors.code3 ||
            !!errors.code4 ||
            !!errors.code5) && (
            <FormHelperText error sx={{px: 2, pl: 7}}>
              Code is required
            </FormHelperText>
          )}
        </Stack>

        <Box mt={2} display="flex" justifyContent="center">
          <Link
            disabled={!resendAllowed}
            sx={{
              color: resendAllowed ? '' : 'text.secondary',
              cursor: resendAllowed ? 'pointer' : 'default',
            }}
            onClick={reSendCode}
            underline="none"
            variant="button"
            type="button"
            component="button"
          >
            {/* TODO: needs icon here */}
            Resend Code
            {!resendAllowed && <span> In {countDown}&nbsp;Seconds</span>}
          </Link>
        </Box>
        <LoadingButton
          sx={{mt: 3}}
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
        >
          {OtpReasons.Login === reason ? 'Login' : 'Verify'}
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
