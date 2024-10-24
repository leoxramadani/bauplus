import Navbar from '@/pages/Navbar/Navbar';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { PropsWithChildren, useEffect, useState } from 'react';
import About from '../molecules/About/About';
import Cards from '../molecules/Cards/Cards';
import Footer from '../molecules/Footer/Footer';
import Loading from './Loading';

const Layout = ({ children }: PropsWithChildren) => {
  const router = useRouter();
  const [isWindowSmall, setIsWindowSmall] = useState(false);
  const [status, setStatus] = useState<string>('');
  const [expanded, setExpanded] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsWindowSmall(window.innerWidth < 768);
      if (window.innerWidth > 768) {
        setIsOpen(isOpen);
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

  if (status === 'loading') return <Loading />;

  // Check if the current route is the home page ("/")
  const isHomePage = router.pathname === '/';

  return (
    <>
      <Head>
        <link rel="icon" href="/Logo.png" sizes="any" />
        <title>BAUplus</title>
      </Head>
      <div onClick={() => (isOpen ? setIsOpen(false) : null)}>
        <div onClick={(e: any) => e.stopPropagation()}>
          <Navbar />
        </div>

        <main
          className={`duration-[250ms]  transition-all ${
            !isWindowSmall &&
            (expanded
              ? `duration-[250ms] transition-all`
              : `duration-[250ms] transition-all md:ml-[4.5rem]`)
          }
          duration-[250ms] transition-all fade-in`}
        >
          <div>{children}</div>

          {isHomePage && (
            <>
              <About />
              <Cards />
            </>
          )}

          <Footer />
        </main>
      </div>
    </>
  );
};

export default Layout;
