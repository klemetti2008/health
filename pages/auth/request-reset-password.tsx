// layouts
import CompactLayout from 'src/layouts/compact';
// components
import Page from 'src/components/Page';
// sections
import RequestSection from 'src/sections/auth/reset-password/RequestSection';

// ----------------------------------------------------------------------

RequestResetPasswordPage.getLayout = (page: React.ReactElement) => <CompactLayout>{page}</CompactLayout>;

// ----------------------------------------------------------------------

export default function RequestResetPasswordPage() {
  return (
    <Page title="Reset Password">
      <RequestSection />
    </Page>
  );
}
