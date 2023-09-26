import Head from 'next/head';
import { PropsWithChildren } from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import { useState, useEffect } from 'react';

const Layout = ({ children }: PropsWithChildren) => {
  //state to check screen size
  const [isWindowSmall, setIsWindowSmall] = useState(false);
  //to open or not the sidebar
  const [isOpen, setIsOpen] = useState(false);

  //effect to react to screen size
  useEffect(() => {
    const handleResize = () => {
      setIsWindowSmall(window.innerWidth < 768);
      if (window.innerWidth > 768) setIsOpen(isOpen);
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
        {isWindowSmall ? (
          <Navbar
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            isWindowSmall={isWindowSmall}
            setIsWindowSmall={setIsWindowSmall}
          />
        ) : (
          <Sidebar
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            isWindowSmall={isWindowSmall}
            setIsWindowSmall={setIsWindowSmall}
          />
        )}
        {isOpen && isWindowSmall && (
          <Sidebar
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            isWindowSmall={isWindowSmall}
            setIsWindowSmall={setIsWindowSmall}
          />
        )}

        <main>{children}</main>
      </div>
    </>
  );
};

export default Layout;
