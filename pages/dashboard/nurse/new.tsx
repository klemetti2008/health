// @mui
import {Container} from '@mui/material';
import Page from 'src/components/Page';
// routes
import {PATH_DASHBOARD} from 'src/routes/paths';
// layouts
import DashboardLayout from 'src/layouts/dashboard';
// components
import {useSettingsContext} from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import {NurseNewForm} from "src/sections/nurse";
import {ReactElement} from "react";

// ----------------------------------------------------------------------

// NurseCreatePage.getLayout = (page: ReactElement) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

export default function NurseCreatePage() {
  const {themeStretch} = useSettingsContext();

  return (
    <DashboardLayout>
      <Page title="Create New Nurse">
        <Container maxWidth={themeStretch ? false : 'lg'}>
          <CustomBreadcrumbs
            heading="Create New Nurse"
            links={[
              {
                name: 'Dashboard',
                href: PATH_DASHBOARD.root,
              },
              {
                name: 'Nurses',
                href: PATH_DASHBOARD.nurse.list,
              },
              {name: 'Create New Nurse'},
            ]}
          />
          <NurseNewForm/>
        </Container>
      </Page>
    </DashboardLayout>
  );
}
