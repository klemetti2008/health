import NextLink from 'next/link';
// @mui
import { Button, Typography, Stack } from '@mui/material';
// layouts
import CompactLayout from 'src/layouts/compact';
// assets
import { MaintenanceIllustration } from 'src/assets/illustrations';
import Page from 'src/components/Page';

// ----------------------------------------------------------------------

MaintenancePage.getLayout = (page: React.ReactElement) => <CompactLayout>{page}</CompactLayout>;

// ----------------------------------------------------------------------

export default function MaintenancePage() {
  return (
    <Page title="Maintenance">
      <Stack sx={{ alignItems: 'center' }}>
        <Typography variant="h3" paragraph>
          Website currently under maintenance
        </Typography>

        <Typography sx={{ color: 'text.secondary' }}>
          We are currently working hard on this page!
        </Typography>

        <MaintenanceIllustration sx={{ my: 10, height: 240 }} />

        <Button component={NextLink} href="/" size="large" variant="contained">
          Go to Home
        </Button>
      </Stack>
    </Page>
  );
}
