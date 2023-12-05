// @mui
import { Stack, StackProps, Typography } from '@mui/material';
// next
import NextLink from 'next/link';

export default function PoweredBy(props: StackProps) {
  return (
    <Stack direction="row" justifyContent="center" {...props}>
      <Typography color="text.secondary" variant="body2" sx={{ textAlign: 'center' }}>
        Powered by &nbsp;
      </Typography>
      <Typography
        component={NextLink}
        target="_blank"
        href="https://hoitek.fi"
        variant="subtitle2"
        color="secondary.main"
        sx={{ textAlign: 'center' }}
      >
        HoiTek.fi
      </Typography>
    </Stack>
  );
}
