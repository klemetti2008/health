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

ReportGroupsListPage.getLayout = (page: React.ReactElement) => (
  <DashboardLayout>{page}</DashboardLayout>
);

// ----------------------------------------------------------------------

export default function ReportGroupsListPage() {
  const { themeStretch } = useSettingsContext();

  return (
    <Page title="Report Group List">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Report Group List"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Report Group', href: PATH_DASHBOARD.report.group.root },
            { name: 'List' },
          ]}
          action={
            <Button
              component={NextLink}
              href={PATH_DASHBOARD.report.group.new}
              variant="contained"
              startIcon={<Iconify icon="eva:plus-fill" />}
            >
              New Report Group
            </Button>
          }
        />

          <ComingSoon date={new Date('07/07/2024 21:30')} />
      </Container>
    </Page>
  );
}
