import Layout from '@/components/layout';
import { Toaster } from '@/components/ui/sonner';
import LanguageProvider from '@/lib/contexts/LanguageContext';
import '@/styles/globals.css';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
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

const ArkivaApp: AppType<{ session: Session | null }> = ({
  Component,
  router,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={client}>
        <LanguageProvider>
          <Layout>
            <Toaster />
            <Component {...pageProps} />
          </Layout>
        </LanguageProvider>
      </QueryClientProvider>
    </SessionProvider>
  );
};

export default ArkivaApp;
