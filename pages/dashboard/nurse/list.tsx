// next
import NextLink from 'next/link';
// @mui
import { Card, Button, Divider, Container } from '@mui/material';
import Page from 'src/components/Page';
// routes
import { PATH_DASHBOARD } from 'src/routes/paths';
// layouts
import DashboardLayout from 'src/layouts/dashboard';
// components
import Iconify from 'src/components/iconify';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import { useSettingsContext } from 'src/components/settings';
// sections
import { NurseDataGrid } from 'src/sections/nurse';
import { ReactElement } from 'react';

// ----------------------------------------------------------------------

NursesListPage.getLayout = (page: ReactElement) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

export default function NursesListPage() {
  const { themeStretch } = useSettingsContext();

  return (
    <Page title="View All Nurses">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="View All Nurses"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Nurses', href: PATH_DASHBOARD.nurse.root },
            { name: 'View All Nurses' },
          ]}
          action={
            <Button
              component={NextLink}
              href={PATH_DASHBOARD.nurse.new}
              variant="contained"
              startIcon={<Iconify icon="eva:plus-fill" />}
            >
              Create New Nurse
            </Button>
          }
        />

        <Card>
          <Divider />
          <NurseDataGrid />
        </Card>
      </Container>
    </Page>
  );
}
