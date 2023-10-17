import Layout from '@/components/layout';
import LanguageProvider from '@/lib/contexts/LanguageContext';
import '@/styles/globals.css';
import { ApolloProvider } from '@apollo/client';
import Client from '../lib/apollo/client';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import type { AppType } from 'next/app';
import NProgress from 'nprogress';
import Router from 'next/router';

const client = new QueryClient();

NProgress.configure({ speed: 500 });
Router.events.on('routeChangeStart', () => {
  NProgress.start();
});

Router.events.on('routeChangeComplete', () => {
  NProgress.done();
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
      <ApolloProvider client={Client}>
        <QueryClientProvider client={client}>
          <LanguageProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </LanguageProvider>
        </QueryClientProvider>
      </ApolloProvider>
    </SessionProvider>
  );
};

export default ArkivaApp;
