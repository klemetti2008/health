// @mui
import { Typography, Stack, Box, styled } from '@mui/material';
// components
import Image from 'src/components/image';
import Logo from 'src/components/logo';
//
import OR from './OR';
import BgLayer from './BgLayer';
// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

const NFCStyled = styled(Stack)(({ theme }) => ({
  padding: theme.spacing(15, 0),
  zIndex: 2,
  width: '100%',
  flexGrow: 1,
}));

const NFCInner = styled(Stack)(({ theme }) => ({
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(0, 4),
}));

export default function LoginLayout({ children }: Props) {
  return (
    <Box sx={{ display: 'flex', position: 'relative' }}>
      <Logo sx={{ width: 60, top: 4, left: 24, position: 'absolute' }} />
      <BgLayer />
      <Stack sx={{ width: 1, flexGrow: 1 }}>{children}</Stack>

      <OR />

      <NFCStyled>
        <NFCInner>
          <Typography variant="h2" color="common.white" sx={{ mb: 10, textAlign: 'center' }}>
            Welcome To
            <br />
            Hoivalani
          </Typography>

          <Box sx={{ textAlign: 'center' }}>
            <Image
              disabledEffect
              visibleByDefault
              alt="auth"
              src="/assets/illustrations/auth/login-laptop.svg"
              sx={{ maxWidth: 550 }}
            />
          </Box>

          <Typography variant="h4" color="common.white" sx={{ textAlign: 'center', mt: 6 }}>
            Please Insert Your NFC Card
          </Typography>
        </NFCInner>
      </NFCStyled>
    </Box>
  );
}
