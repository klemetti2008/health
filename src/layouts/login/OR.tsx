import { Typography, Box } from '@mui/material';

export default function OR() {
  return (
    <Box
      sx={{
        zIndex: 2,
        position: 'fixed',
        top: '50%',
        left: 'calc(50% - 2px)',
        transform: 'translate(-50%, -50%)',
      }}
    >
      <Typography color="primary.main" variant="h1" component="span">
        O
      </Typography>
      <Typography color="primary.contrastText" variant="h1" component="span">
        R
      </Typography>
    </Box>
  );
}
