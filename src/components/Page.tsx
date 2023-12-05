import Head from 'next/head';
import { forwardRef, ReactNode } from 'react';
import { Box, BoxProps } from '@mui/material';
// import { useTranslation } from 'react-i18next';

interface Props extends BoxProps {
  children: ReactNode;
  title: string;
}

const Page = forwardRef<HTMLDivElement, Props>(({ children, title = '', ...other }, ref) => {
  // const { t } = useTranslation('general', { keyPrefix: 'page' });

  // const {
  //   currentLang: { value: lang },
  // } = useLocales();

  return (
    <>
      <Head>
        <title>{`Hoivalani | ${title} `}</title>
      </Head>

      {children}
    </>
  );
});

export default Page;
