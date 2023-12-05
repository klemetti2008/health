// next
import Head from 'next/head';
// @mui
import { Container, Box } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../src/routes/paths';
// _mock_
import { _userCards } from '../../../src/_mock/arrays';
// layouts
import DashboardLayout from '../../../src/layouts/dashboard';
// components
import { useSettingsContext } from '../../../src/components/settings';
import CustomBreadcrumbs from '../../../src/components/custom-breadcrumbs';
// sections
import { UserCard } from '../../../src/sections/user/cards';

// ----------------------------------------------------------------------

UserCardsPage.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

export default function UserCardsPage() {
  const { themeStretch } = useSettingsContext();

  return (
    <>
      <Head>
        <title> User: Cards | Minimal UI</title>
      </Head>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="User Cards"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'User', href: PATH_DASHBOARD.user.root },
            { name: 'Cards' },
          ]}
        />

        <Box
          gap={3}
          display="grid"
          gridTemplateColumns={{
            xs: 'repeat(1, 1fr)',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)',
          }}
        >
          {_userCards.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </Box>
      </Container>
    </>
  );
}
