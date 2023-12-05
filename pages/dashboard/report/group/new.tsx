// @mui
import { Container } from '@mui/material';
import Page from 'src/components/Page';
// routes
import ComingSoon from 'src/sections/global/coming-soon';

import { PATH_DASHBOARD } from 'src/routes/paths';
// layouts
import DashboardLayout from 'src/layouts/dashboard';
// components
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
// sections

// ----------------------------------------------------------------------

PatientCreatePage.getLayout = (page: React.ReactElement) => (
  <DashboardLayout>{page}</DashboardLayout>
);

// ----------------------------------------------------------------------

export default function PatientCreatePage() {
  const { themeStretch } = useSettingsContext();

  return (
    <Page title="New Patient">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Create a new report.group.group"
          links={[
            {
              name: 'Dashboard',
              href: PATH_DASHBOARD.root,
            },
            {
              name: 'Patient',
              href: PATH_DASHBOARD.report.group.list,
            },
            { name: 'New Patient' },
          ]}
        />
        <ComingSoon date={new Date('07/07/2024 21:30')} />
      </Container>
    </Page>
  );
}
