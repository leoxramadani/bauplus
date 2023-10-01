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

  return (
    <>
      <Head>
        <title>Arkiva</title>
      </Head>
      <div className={`min-h-screen flex justify-between w-full`} onClick={()=>isOpen ? setIsOpen(false) : null }>
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
          <div onClick={(e: any) => e.stopPropagation()}>
          <Sidebar
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            isWindowSmall={isWindowSmall}
            setIsWindowSmall={setIsWindowSmall}
            
          />
          
          </div>
        )}

        <main className='w-full max-w-[calc(100vw-16rem)]'>{children}</main>
      </div>
    </>
  );
};

export default Layout;
