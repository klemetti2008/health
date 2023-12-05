// next
import NextLink from 'next/link';
// @mui
import { Link, Stack, Typography } from '@mui/material';
// routes
import { PATH_AUTH } from 'src/routes/paths';

// components
import Iconify from 'src/components/iconify';
// sections
import ResetPasswordForm from './ResetPasswordForm';

export default function ResetPasswordSection() {
  return (
    <>
      <Stack spacing={2} mb={5} alignItems="center">
        <Iconify width={100} icon="ic:round-lock-reset" color="text.secondary" />
        <Typography variant="h3" paragraph>
          Enter you&apos;r new password
        </Typography>

        <Typography variant="subtitle1" sx={{ color: 'text.secondary' }}>
          Enter you&apos;r new password to change you&apos;r password
        </Typography>
      </Stack>

      <ResetPasswordForm />

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
