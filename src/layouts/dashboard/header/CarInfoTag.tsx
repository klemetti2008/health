import { Avatar, Stack, Typography } from '@mui/material';
import Iconify from 'src/components/iconify';

export default function CarInfoTag() {
  return (
    <Stack direction="row" spacing={2}>
      <Avatar sx={{ bgcolor: 'primary.main' }}>
        <Iconify width={28} color="common.white" icon="ic:outline-directions-car" />
      </Avatar>
      <Stack>
        <Typography variant="subtitle2" color="text.primary">
          Toyota / Automatic
        </Typography>
        <Typography variant="body2" color="text.secondary">
          No. 2548997
        </Typography>
      </Stack>
    </Stack>
  );
}
