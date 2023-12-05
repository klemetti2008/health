// components
import Page from 'src/components/Page';
// auth
import GuestGuard from 'src/auth/GuestGuard';
// sections
import LoginSection from 'src/sections/auth/login/LoginSection';
// layouts
import LoginLayout from 'src/layouts/login/LoginLayout';

// ----------------------------------------------------------------------

export default function LoginPage() {
  return (
    <Page title="Login">
      <GuestGuard>
        <LoginLayout>
          <LoginSection />
        </LoginLayout>
      </GuestGuard>
    </Page>
  );
}
