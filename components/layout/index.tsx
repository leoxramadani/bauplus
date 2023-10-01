import Head from 'next/head';
import { PropsWithChildren } from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import { useState, useEffect } from 'react';

const Layout = ({ children }: PropsWithChildren) => {
  const [expanded,setExpanded] = useState(true);
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

  const toggleSidebar = () =>{
    setExpanded(prev=>!prev);
    console.log("Toggle sidebar here:");
    
  }

  return (
    <>
      <Head>
        <title>Arkiva</title>
      </Head>
      <div
        className={`min-h-screen flex flex-col w-full scroll`}
        onClick={() => (isOpen ? setIsOpen(false) : null)}
      >
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
            toggleSidebar={toggleSidebar}
            expanded={expanded}
          />
        )}
        {isOpen && isWindowSmall && (
          <div onClick={(e: any) => e.stopPropagation()}>
            <Sidebar
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              isWindowSmall={isWindowSmall}
              setIsWindowSmall={setIsWindowSmall}
              toggleSidebar={toggleSidebar}
              expanded={expanded}
            />
          </div>
        )}

        <main className={`mt-5 sm:p-4 ${expanded ? `ml-[15rem]` : `sm:ml-[4.5rem]`}`}>{children}</main>
      </div>
    </>
  );
};

export default Layout;
