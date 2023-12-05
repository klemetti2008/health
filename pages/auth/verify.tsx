// next
import { useRouter } from 'next/router';
// react
import { useEffect } from 'react';
// components
import Page from 'src/components/Page';
// layouts
import CompactLayout from 'src/layouts/compact/CompactLayout';
// redux
import { loginValuesSelector } from 'src/redux/slices/auth';
import { useSelector } from 'src/redux/store';
// routes
import { PATH_AUTH } from 'src/routes/paths';
// sections
import VerifyCodeSection from 'src/sections/auth/verify-code/VerifyCodeSection';

// ----------------------------------------------------------------------

VerifyCodePage.getLayout = (page: React.ReactElement) => <CompactLayout>{page}</CompactLayout>;

// ----------------------------------------------------------------------

export default function VerifyCodePage() {
  const { email } = useSelector(loginValuesSelector);

  console.log(email)

  const router = useRouter();

  useEffect(() => {
    if (!email) {
      router.push(PATH_AUTH.login);
    }
  }, [email, router]);

  if (!email) {
    return null;
  }

  return (
    <Page title="Verify">
      <VerifyCodeSection />
    </Page>
  );
}
