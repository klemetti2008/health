// next
import { useRouter } from 'next/router';
// Components
import Page from 'src/components/Page';
// layouts
import CompactLayout from 'src/layouts/compact/CompactLayout';
// routes
import { PATH_DASHBOARD } from 'src/routes/paths';
// sections
import ChangePasswordSection from 'src/sections/auth/change-password/ChangePasswordSection';

// ----------------------------------------------------------------------

NewPasswordPage.getLayout = (page: React.ReactElement) => <CompactLayout>{page}</CompactLayout>;

// ----------------------------------------------------------------------


export default function NewPasswordPage() {
  const router = useRouter();
  // const { user: { forcedPasswordChange }, isInitialized } = useAuthContext();

  const forcedPasswordChange = true;
  // This makes the page load only if password should get changed
  if (!forcedPasswordChange) {
    router.push(PATH_DASHBOARD.root);
    return null;
  }

  return (
    <Page title="New Password">
      <ChangePasswordSection />
    </Page>
  );
}
