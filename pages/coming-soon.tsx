// layouts
import CompactLayout from 'src/layouts/compact';

import Page from 'src/components/Page';
import ComingSoon from 'src/sections/global/coming-soon';

// ----------------------------------------------------------------------

ComingSoonPage.getLayout = (page: React.ReactElement) => <CompactLayout>{page}</CompactLayout>;

// ----------------------------------------------------------------------

export default function ComingSoonPage() {
  return (
    <Page title="Coming Soon">
      <ComingSoon date={new Date('07/07/2024 21:30')} />
    </Page>
  );
}

// ----------------------------------------------------------------------
