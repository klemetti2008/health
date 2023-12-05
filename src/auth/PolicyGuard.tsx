import { useState, useEffect } from 'react';
// next
import { useRouter } from 'next/router';
// components
import LoadingScreen from 'src/components/loading-screen';
//
import { useAuthContext } from 'src/auth/useAuthContext';
import PrivacyPolicySection from 'src/sections/auth/privacy-policy/PrivacyPolicySection';
import CompactLayout from 'src/layouts/compact/CompactLayout';

// ----------------------------------------------------------------------

type PolicyGuardProps = {
  children: React.ReactNode;
};

export default function PolicyGuard({ children }: PolicyGuardProps) {
  const { user, isInitialized } = useAuthContext();

  const { pathname, push } = useRouter();

  const [requestedLocation, setRequestedLocation] = useState<string | null>(null);

  useEffect(() => {
    if (requestedLocation && pathname !== requestedLocation) {
      push(requestedLocation);
    }
    if (user?.privacy_policy_accepted_at) {
      setRequestedLocation(null);
    }
  }, [user?.privacy_policy_accepted_at, pathname, push, requestedLocation]);

  if (!isInitialized) {
    return <LoadingScreen />;
  }

  if (!user?.privacy_policy_accepted_at) {
    if (pathname !== requestedLocation) {
      setRequestedLocation(pathname);
    }
    return (
      <CompactLayout>
        <PrivacyPolicySection />
      </CompactLayout>
    );
  }

  return <> {children} </>;
}
