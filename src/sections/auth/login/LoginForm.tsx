import {useCallback, useState} from 'react';
import * as Yup from 'yup';
// next
import NextLink from 'next/link';
// form
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
// @mui
import {
  Link,
  Stack,
  Alert,
  IconButton,
  InputAdornment,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {LoadingButton} from '@mui/lab';
// routes
import {PATH_AUTH} from 'src/routes/paths';
// components
import Iconify from 'src/components/iconify';
import FormProvider, {RHFCheckbox, RHFSelect, RHFTextField} from 'src/components/hook-form';
import Image from 'src/components/image';
import {useLocales} from 'src/locales';
import {SSOClient} from 'src/_clients';
import {OtpReasons, OtpTargets} from 'src/@types/auth';
import {useRouter} from 'next/router';
import {useSnackbar} from 'src/components/snackbar';
import {useDispatch, useSelector} from 'src/redux/store';
import {loginValuesChanged, loginValuesSelector, otpValuesChanged} from 'src/redux/slices/auth';
// ----------------------------------------------------------------------

type LoginFormValuesProps = {
  email: string;
  password: string;
  language: string;
  remember: boolean;
  afterSubmit?: string;
};

export default function LoginForm() {
  const router = useRouter();
  const {allLangs, currentLang, onChangeLang} = useLocales();

  const dispatch = useDispatch();

  const {enqueueSnackbar} = useSnackbar();

  const {remember: rememberMe} = useSelector(loginValuesSelector);

  const [showPassword, setShowPassword] = useState(false);

  const LoginSchema = Yup.object().shape({
    email: Yup.string().required('Email is required').email('Email must be a valid email address'),
    password: Yup.string().required('Password is required'),
    language: Yup.string().required('Language is required'),
  });

  const defaultValues = {
    email: '',
    password: '',
    remember: rememberMe,
    language: currentLang.value,
  };

  const methods = useForm<LoginFormValuesProps>({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    watch,
    reset,
    setError,
    handleSubmit,
    formState: {errors, isSubmitting, isSubmitSuccessful},
  } = methods;

  const {language} = watch();

  if (language !== currentLang.value) {
    onChangeLang(language);
  }

  const toggleShowPassword = useCallback(() => {
    setShowPassword(prev => !prev)
  }, [])

  const onSubmit = async (data: LoginFormValuesProps) => {
    const {email, password, remember} = data;
    try {
      // TODO: if option otp is enabled
      // call to otp request here and if successful
      const response = await SSOClient.post('/otp/send', {
        password,
        username: email,
        reason: OtpReasons.Login,
        target: OtpTargets.Email,
      });

      const {token, coolDown} = response.data.data;

      dispatch(loginValuesChanged({email, password, remember}));

      dispatch(otpValuesChanged({reason: OtpReasons.Login, token, coolDown}));

      enqueueSnackbar('OTP sent to your email', {variant: 'success'});

      reset();

      router.push(PATH_AUTH.verify);
      // TODO: else login directly with username and password
    } catch (error) {
      console.log(error);
      setError('afterSubmit', {
        ...error.data,
        message: error.message || "We couldn't send you an OTP. Please try again later.",
      });
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}

        <RHFTextField name="email" label="Email address"/>

        <RHFTextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={toggleShowPassword} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'}/>
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <RHFSelect name="language" label="Select Language" size="small">
          {allLangs.map((lang) => (
            <MenuItem key={lang.value} value={lang.value}>
              <Stack direction="row" sx={{pt: 0.4}}>
                <ListItemIcon sx={{width: 36}}>
                  <Image disabledEffect width={30} height={18} src={lang.icon}/>
                </ListItemIcon>
                <ListItemText>{lang.label}</ListItemText>
              </Stack>
            </MenuItem>
          ))}
        </RHFSelect>
      </Stack>

      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{my: 2}}>
        <RHFCheckbox name="remember" label="Remember me"/>

        <Link
          component={NextLink}
          href={PATH_AUTH.requestResetPassword}
          variant="body2"
          color="primary.main"
          underline="always"
        >
          Forgot password?
        </Link>
      </Stack>

      <LoadingButton
        fullWidth
        color="primary"
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitSuccessful || isSubmitting}
      >
        {/* TODO: if from option otp is enabled for signing 
        in the text is send code otherwise its Login  */}
        Send Code
      </LoadingButton>
    </FormProvider>
  );
}
