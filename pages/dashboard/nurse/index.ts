import { useEffect } from 'react';
// next
import { useRouter } from 'next/router';
// routes
import { PATH_DASHBOARD } from 'src/routes/paths';

// ----------------------------------------------------------------------

export default function Index() {
  const { pathname, push, prefetch } = useRouter();

  useEffect(() => {
    if (pathname === PATH_DASHBOARD.nurse.root) {
      push(PATH_DASHBOARD.nurse.list);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  useEffect(() => {
    prefetch(PATH_DASHBOARD.nurse.list);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
