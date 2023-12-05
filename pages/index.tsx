// auth
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { PATH_APP, PATH_DASHBOARD } from 'src/routes/paths';

// ----------------------------------------------------------------------

export default function HomePage() {
  const { pathname, replace } = useRouter();

  useEffect(() => {
    if (pathname === PATH_APP.root) {
      replace(PATH_DASHBOARD.root);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return null;
}
