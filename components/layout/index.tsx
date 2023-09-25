import Head from 'next/head';
import { PropsWithChildren } from 'react';
import Sidebar from './Sidebar';

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div className="h-screen w-screen">
      <Head>
        <title>Arkiva</title>
      </Head>
      <div className="flex flex-row">
        <Sidebar />
        <main>{children}</main>
      </div>
    </div>
  );
};

export default Layout;
