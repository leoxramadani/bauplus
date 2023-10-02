import Layout from '@/components/layout';
import client from '@/lib/apollo/client';
import LanguageProvider from '@/lib/contexts/LanguageContext';
import '@/styles/globals.css';
import { ApolloProvider } from '@apollo/client';
import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import type { AppProps, AppType } from 'next/app';

const ArkivaApp: AppType<{ session: Session | null }> = ({
  Component,
  router,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <ApolloProvider client={client}>
        <LanguageProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </LanguageProvider>
      </ApolloProvider>
    </SessionProvider>
  );
};

export default ArkivaApp;
