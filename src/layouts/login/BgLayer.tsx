import { Box } from '@mui/material';

export default function BgLayer() {
  return (
    <Box
      sx={{
        zIndex: 1,
        top: '0',
        right: 0,
        width: '50%',
        height: '100vh',
        position: 'fixed',
        bgcolor: 'primary.main',
      }}
    />
  );
}
