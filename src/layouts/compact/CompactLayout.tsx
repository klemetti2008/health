// next
import dynamic from 'next/dynamic';
// @mui
import { Stack, Container } from '@mui/material';
// hooks
import useOffSetTop from 'src/hooks/useOffSetTop';
// config
import { HEADER } from 'src/config-global';
import PoweredBy from 'src/components/PoweredBy';
//
const Header = dynamic(() => import('./Header'), { ssr: false });

// ----------------------------------------------------------------------

type Props = {
  children?: React.ReactNode;
};

export default function CompactLayout({ children }: Props) {
  const isOffset = useOffSetTop(HEADER.H_MAIN_DESKTOP);

  return (
    <>
      <Header isOffset={isOffset} />

      <Container component="main">
        <Stack
          sx={{
            py: 12,
            m: 'auto',
            maxWidth: 450,
            minHeight: '100vh',
            textAlign: 'center',
            justifyContent: 'center',
          }}
        >
          {children}
          <PoweredBy
            sx={{
              position: 'fixed',
              bottom: 0,
              pb: 1,
              left: '50%',
              transform: 'translateX(-50%)',
              width: '100%',
              bgcolor: 'background.paper',
            }}
          />
        </Stack>
      </Container>
    </>
  );
}
