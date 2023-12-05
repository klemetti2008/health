// layouts
import { Button, Stack, Typography } from '@mui/material';
import Iconify from 'src/components/iconify';
import { useAuthContext } from 'src/auth/useAuthContext';

import ChangePasswordForm from './ChangePasswordForm';

// ----------------------------------------------------------------------

export default function ChangePasswordSection() {
  const { logout } = useAuthContext();

  return (
    <Stack>
      <Stack alignItems="center" spacing={2} mb={5}>
        <Iconify icon="mdi:password-outline" width={100} />

        <Typography variant="h3">Please change you&rsquo;r password</Typography>

        <Typography variant="subtitle1" color="text.secondary">
          Please Enter your old and new password to change you&rsquo;r password
        </Typography>
      </Stack>

      <ChangePasswordForm />

      <Button
        onClick={logout}
        fullWidth
        color="inherit"
        variant="text"
        sx={{
          mt: 3,
          mx: 'auto',
          alignItems: 'center',
          display: 'inline-flex',
        }}
      >
        <Iconify icon="eva:chevron-left-fill" width={16} />
        Sign Out
      </Button>
    </Stack>
  );
}
