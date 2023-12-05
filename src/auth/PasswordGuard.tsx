import { useState, useEffect } from 'react';
// next
import { useRouter } from 'next/router';
// components
import LoadingScreen from 'src/components/loading-screen';
//
import { useAuthContext } from 'src/auth/useAuthContext';
import ChangePasswordSection from 'src/sections/auth/change-password/ChangePasswordSection';
import CompactLayout from 'src/layouts/compact/CompactLayout';

// ----------------------------------------------------------------------

type PasswordGuardProps = {
  children: React.ReactNode;
};

export default function PasswordGuard({ children }: PasswordGuardProps) {
  const { user, isInitialized } = useAuthContext();

  const { pathname, push } = useRouter();

  const [requestedLocation, setRequestedLocation] = useState<string | null>(null);

  useEffect(() => {
    if (requestedLocation && pathname !== requestedLocation) {
      push(requestedLocation);
    }
    if (!user?.forcedChangePassword) {
      setRequestedLocation(null);
    }
  }, [user?.forcedChangePassword, pathname, push, requestedLocation]);

  if (!isInitialized) {
    return <LoadingScreen />;
  }

  if (user?.forcedChangePassword) {
    if (pathname !== requestedLocation) {
      setRequestedLocation(pathname);
    }
    return (
      <CompactLayout>
        <ChangePasswordSection />
      </CompactLayout>
    );
  }

  return <> {children} </>;
}
