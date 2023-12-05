import { Box, Stack, Typography } from '@mui/material';
// hooks
import useCountdown from 'src/hooks/useCountdown';

// assets
import { ComingSoonIllustration } from 'src/assets/illustrations';

export default function ComingSoon({ date, dense }: { date: Date; dense?: boolean }) {
  const { days, hours, minutes, seconds } = useCountdown(date);

  return (
    <Stack padding={5} alignItems="center">
      <Typography variant="h3" paragraph>
        Coming Soon!
      </Typography>

      <Typography sx={{ color: 'text.secondary' }}>
        We are currently working hard on this page!
      </Typography>

      <ComingSoonIllustration sx={{ my: 10, height: 240 }} />

      <Stack
        direction={!dense?'row':'column'}
        justifyContent="center"
        divider={<Box sx={{ mx: { xs: 1, sm: 2.5 } }}>:</Box>}
        sx={{ typography: !dense?'h2':'h4' }}
      >
        <TimeBlock label="Days" value={days} />

        <TimeBlock label="Hours" value={hours} />

        <TimeBlock label="Minutes" value={minutes} />

        <TimeBlock label="Seconds" value={seconds} />
      </Stack>

    </Stack>
  );
}

type TimeBlockProps = {
  label: string;
  value: string;
};

function TimeBlock({ label, value }: TimeBlockProps) {
  return (
    <div>
      <Box> {value} </Box>
      <Box sx={{ color: 'text.secondary', typography: 'body1' }}>{label}</Box>
    </div>
  );
}
