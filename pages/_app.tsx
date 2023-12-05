// i18n
import '../src/locales/i18n';

// scroll bar
import 'simplebar-react/dist/simplebar.min.css';

// lightbox
import 'yet-another-react-lightbox/styles.css';
import 'yet-another-react-lightbox/plugins/captions.css';
import 'yet-another-react-lightbox/plugins/thumbnails.css';

// map
import 'mapbox-gl/dist/mapbox-gl.css';

// editor
import 'react-quill/dist/quill.snow.css';

// slick-carousel
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// lazy image
import 'react-lazy-load-image-component/src/effects/blur.css';

// Yup
// TODO: Yup locales

// ----------------------------------------------------------------------

import {CacheProvider, EmotionCache} from '@emotion/react';
// next
import {NextPage} from 'next';
import Head from 'next/head';
import {AppProps} from 'next/app';
// redux
import {Provider as ReduxProvider} from 'react-redux';
// @mui
import {LocalizationProvider} from '@mui/x-date-pickers';
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns';
// redux
import {store} from 'src/redux/store';
// utils
import createEmotionCache from 'src/utils/createEmotionCache';
// theme
import ThemeProvider from 'src/theme';
// locales
import ThemeLocalization from 'src/locales';
// components
import {StyledChart} from 'src/components/chart';
import ProgressBar from 'src/components/progress-bar';
import SnackbarProvider from 'src/components/snackbar';
import {MotionLazyContainer} from 'src/components/animate';
import {ThemeSettings, SettingsProvider} from 'src/components/settings';

import {AuthProvider} from 'src/auth/JwtContext';
import {QueryClient, QueryClientProvider} from "react-query";

// ----------------------------------------------------------------------

const clientSideEmotionCache = createEmotionCache();

type NextPageWithLayout = NextPage & {
  getLayout?: (page: React.ReactElement) => React.ReactNode;
};

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
  Component: NextPageWithLayout;
}

const client = new QueryClient();

export default function MyApp(props: MyAppProps) {
  const {Component, pageProps, emotionCache = clientSideEmotionCache} = props;

  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width"/>
      </Head>

      <QueryClientProvider client={client}>
        <AuthProvider>
          <ReduxProvider store={store}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <SettingsProvider>
                <MotionLazyContainer>
                  <ThemeProvider>
                    <ThemeSettings>
                      <ThemeLocalization>
                        <SnackbarProvider>
                          <StyledChart/>
                          <ProgressBar/>
                          {getLayout(<Component {...pageProps} />)}
                        </SnackbarProvider>
                      </ThemeLocalization>
                    </ThemeSettings>
                  </ThemeProvider>
                </MotionLazyContainer>
              </SettingsProvider>
            </LocalizationProvider>
          </ReduxProvider>
        </AuthProvider>
      </QueryClientProvider>
    </CacheProvider>
  );
}
