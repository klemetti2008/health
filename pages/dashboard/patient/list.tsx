import NextLink from 'next/link';
// @mui
import { Button, Card, Container } from '@mui/material';
import Page from 'src/components/Page';
// routes
import { PATH_DASHBOARD } from 'src/routes/paths';
// layouts
import DashboardLayout from 'src/layouts/dashboard';
// components
import Iconify from 'src/components/iconify';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import { useSettingsContext } from 'src/components/settings';
import ComingSoon from 'src/sections/global/coming-soon';

// ----------------------------------------------------------------------

PatientsListPage.getLayout = (page: React.ReactElement) => (
  <DashboardLayout>{page}</DashboardLayout>
);

// ----------------------------------------------------------------------

export default function PatientsListPage() {
  const { themeStretch } = useSettingsContext();

  return (
    <Page title="Patient List">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Patient List"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Patient', href: PATH_DASHBOARD.patient.root },
            { name: 'List' },
          ]}
          action={
            <Button
              component={NextLink}
              href={PATH_DASHBOARD.patient.new}
              variant="contained"
              startIcon={<Iconify icon="eva:plus-fill" />}
            >
              New Patient
            </Button>
          }
        />

          <ComingSoon date={new Date('07/07/2024 21:30')} />
      </Container>
    </Page>
  );
}
