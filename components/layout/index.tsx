import Head from 'next/head';
import { useRouter } from 'next/router';
import { PropsWithChildren, useEffect, useState } from 'react';
import Breadcrumbs from '../ui/breadcrumbs';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

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
        className={`scroll flex min-h-screen w-full flex-col`}
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
          className={`duration-[250ms] p-4 transition-all ${
            !isWindowSmall &&
            (expanded
              ? `duration-[250ms] ml-[15rem] transition-all`
              : `duration-[250ms] transition-all md:ml-[4.5rem]`)
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
