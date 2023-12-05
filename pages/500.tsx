import { m } from 'framer-motion';
import NextLink from 'next/link';
// @mui
import { Button, Typography } from '@mui/material';
// layouts
import CompactLayout from 'src/layouts/compact';
// components
import { MotionContainer, varBounce } from 'src/components/animate';
// assets
import { SeverErrorIllustration } from 'src/assets/illustrations';
import Page from 'src/components/Page';

// ----------------------------------------------------------------------

Page500.getLayout = (page: React.ReactElement) => <CompactLayout>{page}</CompactLayout>;

// ----------------------------------------------------------------------

export default function Page500() {
  return (
    <Page title="500 Internal Server Error">
   

      <MotionContainer>
        <m.div variants={varBounce().in}>
          <Typography variant="h3" paragraph>
            500 Internal Server Error
          </Typography>
        </m.div>

        <m.div variants={varBounce().in}>
          <Typography sx={{ color: 'text.secondary' }}>
            There was an error, please try again later.
          </Typography>
        </m.div>

        <m.div variants={varBounce().in}>
          <SeverErrorIllustration sx={{ height: 260, my: { xs: 5, sm: 10 } }} />
        </m.div>

        <Button component={NextLink} href="/" size="large" variant="contained">
          Go to Home
        </Button>
      </MotionContainer>
    </Page>
  );
}
