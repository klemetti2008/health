import NextLink from 'next/link';
// @mui
import { Button, Container } from '@mui/material';
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

ReportListPage.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

export default function ReportListPage() {
  const { themeStretch } = useSettingsContext();

  return (
    <Page title="Report List">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Report List"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Report', href: PATH_DASHBOARD.report.root },
            { name: 'List' },
          ]}
        />

        <ComingSoon date={new Date('07/07/2024 21:30')} />
      </Container>
    </Page>
  );
}
