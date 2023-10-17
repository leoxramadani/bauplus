import Head from 'next/head';
import { PropsWithChildren } from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Breadcrumbs from '../ui/breadcrumbs';

const Layout = ({ children }: PropsWithChildren) => {
  const router = useRouter();
  //state to check screen size
  const [isWindowSmall, setIsWindowSmall] = useState(false);
  //to open or not the sidebar
  const [expanded, setExpanded] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  //effect to react to screen size
  useEffect(() => {
    const handleResize = () => {
      setIsWindowSmall(window.innerWidth < 768);
      if (window.innerWidth > 768) {
        setIsOpen(isOpen);
        // setExpanded(false);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const toggleSidebar = () => {
    setExpanded((prev) => !prev);
    console.log('Toggle sidebar here:');
  };

  if (router.asPath === '/login') return children;
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
        <main
          className={`p-4 transition-all duration-[250ms] ${
            !isWindowSmall &&
            (expanded
              ? `ml-[15rem] transition-all duration-[250ms]`
              : `md:ml-[4.5rem] transition-all duration-[250ms]`)
          }`}
        >
          <Breadcrumbs />
          <div className="mt-4">{children}</div>
        </main>
      </div>
    </>
  );
};

export default Layout;
