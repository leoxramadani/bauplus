import Layout from '@/components/layout';
import { ExploreProvider } from '@/lib/contexts/ExploreContext';
import LanguageProvider from '@/lib/contexts/LanguageContext';
import { ThemeProvider } from '@/lib/contexts/ThemeContext';
import '@/styles/globals.css';
import { QueryClient } from '@tanstack/react-query';
import { Session } from 'next-auth';
import type { AppType } from 'next/app';
import Router from 'next/router';
import NProgress from 'nprogress';

const client = new QueryClient();

NProgress.configure({ speed: 500 });
Router.events.on('routeChangeStart', (url, { shallow }) => {
  if (!shallow) NProgress.start();
});

Router.events.on('routeChangeComplete', (url, { shallow }) => {
  if (!shallow) NProgress.done();
});

Router.events.on('routeChangeError', () => {
  NProgress.done();
  NProgress.configure({ speed: 1000 });
});

const BAUplus: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { ...pageProps },
}) => {
  return (
    <LanguageProvider>
      <ExploreProvider>
        <ThemeProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
      </ExploreProvider>
    </LanguageProvider>
  );
};

export default BAUplus;
