// next
import { useRouter } from 'next/router';
// components
import Page from 'src/components/Page';
// layouts
import CompactLayout from 'src/layouts/compact';
// routes
import { PATH_DASHBOARD } from 'src/routes/paths';
// sections
import PrivacyPolicySection from 'src/sections/auth/privacy-policy/PrivacyPolicySection';

// ----------------------------------------------------------------------

PrivacyPolicyPage.getLayout = (page: React.ReactElement) => <CompactLayout>{page}</CompactLayout>;

// ----------------------------------------------------------------------

export default function PrivacyPolicyPage() {
  const router = useRouter();
  // const { user: { policyAcceptedAt }, isInitialized } = useAuthContext();

  const policyAcceptedAt = null;
  // This makes the page load only if policy is not accepted
  if (policyAcceptedAt) {
    router.push(PATH_DASHBOARD.root);
    return null;
  }

  return (
    <Page title="Privacy Policy">
      <PrivacyPolicySection />
    </Page>
  );
}
