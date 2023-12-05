// @mui
import { Container } from '@mui/material';
import Page from 'src/components/Page';
// routes
import ComingSoon from 'src/sections/global/coming-soon';

import { PATH_DASHBOARD } from '../../../src/routes/paths';
// layouts
import DashboardLayout from '../../../src/layouts/dashboard';
// components
import { useSettingsContext } from '../../../src/components/settings';
import CustomBreadcrumbs from '../../../src/components/custom-breadcrumbs';
// sections

// ----------------------------------------------------------------------

CycleCreatePage.getLayout = (page: React.ReactElement) => (
  <DashboardLayout>{page}</DashboardLayout>
);

// ----------------------------------------------------------------------

export default function CycleCreatePage() {
  const { themeStretch } = useSettingsContext();

  return (
    <Page title="New Cycle">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Create a new cycle"
          links={[
            {
              name: 'Dashboard',
              href: PATH_DASHBOARD.root,
            },
            {
              name: 'Cycle',
              href: PATH_DASHBOARD.cycle.list,
            },
            { name: 'New Cycle' },
          ]}
        />
        <ComingSoon date={new Date('07/07/2024 21:30')} />
      </Container>
    </Page>
  );
}
