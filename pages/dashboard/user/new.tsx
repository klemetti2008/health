// next
import Head from 'next/head';
// @mui
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../src/routes/paths';
// layouts
import DashboardLayout from '../../../src/layouts/dashboard';
// components
import { useSettingsContext } from '../../../src/components/settings';
import CustomBreadcrumbs from '../../../src/components/custom-breadcrumbs';
// sections
import UserNewEditForm from '../../../src/sections/user/UserNewEditForm';

// ----------------------------------------------------------------------

UserCreatePage.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

export default function UserCreatePage() {
  const { themeStretch } = useSettingsContext();

  return (
    <>
      <Head>
        <title> User: Create a new user | Minimal UI</title>
      </Head>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Create a new user"
          links={[
            {
              name: 'Dashboard',
              href: PATH_DASHBOARD.root,
            },
            {
              name: 'User',
              href: PATH_DASHBOARD.user.list,
            },
            { name: 'New user' },
          ]}
        />
        <UserNewEditForm />
      </Container>
    </>
  );
}
