import Layout from '@/components/layout';
import LanguageProvider from '@/lib/contexts/LanguageContext';
import '@/styles/globals.css';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import type { AppType } from 'next/app';

const client = new QueryClient();

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
            <Component {...pageProps} />
          </Layout>
        </LanguageProvider>
      </QueryClientProvider>
    </SessionProvider>
  );
};

export default ArkivaApp;
