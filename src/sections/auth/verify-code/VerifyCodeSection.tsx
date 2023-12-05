// redux
import { useSelector } from 'react-redux';
// assets
import { Link, Stack, Typography } from '@mui/material';
import Iconify from 'src/components/iconify/Iconify';
import { PATH_AUTH } from 'src/routes/paths';
import NextLink from 'next/link';
import Image from 'src/components/image';
import { loginValuesSelector } from 'src/redux/slices/auth';

import VerifyCodeForm from './VerifyCodeForm';

export default function VerifyCodeSection() {
  const { email } = useSelector(loginValuesSelector);

  return (
    <>
      <Stack spacing={2} mb={5} alignItems="center">
        <Image width={100} height={100} src="/assets/icons/auth/ic_email_sent.png" />

        <Typography variant="h3" paragraph>
          Please check your email!
        </Typography>
        <Stack direction="row" justifyContent="center">
          <Typography
            variant="subtitle2"
            color="text.secondary"
            textAlign="center"
            sx={{ width: 350, textAlign: 'center' }}
          >
            {/* TODO: make the 5-digits dynamic */}
            We have emailed a 5-digit confirmation code to <b>{email}</b>, please enter the code in
            below box to verify your email.
          </Typography>
        </Stack>
      </Stack>

      <VerifyCodeForm />

      <Link
        component={NextLink}
        href={PATH_AUTH.login}
        color="inherit"
        variant="subtitle2"
        sx={{
          mt: 3,
          mx: 'auto',
          alignItems: 'center',
          display: 'inline-flex',
        }}
      >
        <Iconify icon="eva:chevron-left-fill" width={16} />
        Return to sign in
      </Link>
    </>
  );
}
