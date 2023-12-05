// layouts
import { Stack, styled, Typography } from '@mui/material';
import Iconify from 'src/components/iconify';
// components
import PoweredBy from 'src/components/PoweredBy';
import LoginForm from './LoginForm';

// ----------------------------------------------------------------------

const StyledRoot = styled(Stack)(({ theme }) => ({
  width: 450,
  margin: 'auto',
  display: 'flex',
  minHeight: '100vh',
  justifyContent: 'center',
  padding: theme.spacing(15, 2),
  position: 'relative',
  [theme.breakpoints.up('md')]: {
    flexShrink: 0,
  },
}));

export default function LoginSection() {
  return (
    <StyledRoot>
      <Stack spacing={2} sx={{ alignItems: 'center', mb: 5 }}>
        <Iconify icon="material-symbols:login-rounded" width={100} color="text.secondary" />

        <Typography variant="h3">Login</Typography>

        <Typography variant="subtitle1" color="text.secondary">
          Please enter your registered email and password
        </Typography>
      </Stack>

      <LoginForm />

      <PoweredBy
        sx={{
          position: 'absolute',
          bottom: 0,
          pb: 1,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '100%',
          bgcolor: 'background.paper',
        }}
      />
    </StyledRoot>
  );
}
