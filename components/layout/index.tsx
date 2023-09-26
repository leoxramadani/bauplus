import Head from 'next/head';
import { PropsWithChildren } from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import { useState, useEffect } from 'react';

const Layout = ({ children }: PropsWithChildren) => {
  //state to check screen size
  const [isSmall, setIsSmall] = useState(false);
  //to open or not the sidebar
  const [isOpen, setIsOpen] = useState(false);

  //effect to react to screen size
  useEffect(() => {
    const handleResize = () => {
      setIsSmall(window.innerWidth < 1024);
      if (window.innerWidth > 1024) setIsOpen(isOpen);
    };

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // return (
  //   <div className="h-screen w-screen">
  //     <Head>
  //       <title>Arkiva</title>
  //     </Head>
  //     <Navbar />
  //     <div className="flex flex-row">
  //       <Sidebar />
  //       <main>{children}</main>
  //     </div>
  //     dasd
  //   </div>
  // );

  return (
    <>
      <Head>
        <title>Arkiva</title>
      </Head>
      <div className={`min-h-screen flex flex-col w-full`}>
        {isSmall ? (
          <Navbar />
        ) : (
          <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
        )}
        {isOpen && isSmall && (
          <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
        )}

        <main>{children}</main>
      </div>
    </>
  );
};

export default Layout;
