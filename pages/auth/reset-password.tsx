// layouts
import CompactLayout from 'src/layouts/compact';
// components
import Page from 'src/components/Page';
// sections
import ResetPasswordSection from 'src/sections/auth/reset-password/ResetPasswordSection';

// ----------------------------------------------------------------------

ResetPasswordPage.getLayout = (page: React.ReactElement) => <CompactLayout>{page}</CompactLayout>;

// ----------------------------------------------------------------------

// FIXME: persist exchange code in url to prevent refresh data loss

export default function ResetPasswordPage() {
  return (
    <Page title="Reset Password">
      <ResetPasswordSection />
    </Page>
  );
}
