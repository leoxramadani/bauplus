import { useExplore } from '@/lib/contexts/ExploreContext';
import Navbar from '@/pages/Navbar/Navbar';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { PropsWithChildren, useEffect, useState } from 'react';
import About from '../molecules/About/About';
import Cards from '../molecules/Cards/Cards';
import Footer from '../molecules/Footer/Footer';
import Numbers from '../molecules/Numbers/Numbers';
import Loading from './Loading';

const Layout = ({ children }: PropsWithChildren) => {
  const router = useRouter();
  const [isWindowSmall, setIsWindowSmall] = useState(false);
  const [status, setStatus] = useState<string>('');
  const [expanded, setExpanded] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const { isExploreClicked, setExploreClicked } = useExplore();

  // State to determine if localStorage has been accessed
  const [hasVisited, setHasVisited] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const visited = localStorage.getItem('visited');
      setHasVisited(visited === 'true');
      if (!visited && router.pathname === '/') {
        setExploreClicked(false);
      } else {
        setExploreClicked(true);
      }
    }
  }, [router.pathname, setExploreClicked]);

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

  const handleExploreClick = () => {
    localStorage.setItem('visited', 'true');
    setExploreClicked(true); // This should update the context
    document.body.style.overflow = 'auto'; // Re-enable scrolling when overlay is removed
  };

  useEffect(() => {
    if (!isExploreClicked) {
      document.body.style.overflow = 'hidden'; // Disable scrolling while overlay is shown
    } else {
      document.body.style.overflow = 'auto'; // Re-enable scrolling when overlay is hidden
    }
  }, [isExploreClicked]);

  const isHomePage = router.pathname === '/';
  const isIzolimePage = router.pathname === '/izolime';

  return (
    <>
      <Head>
        <link rel="icon" href="/Logo.webp" sizes="any" />
        <title>BAUplus</title>
      </Head>
      <div onClick={() => (isOpen ? setIsOpen(false) : null)}>
        <div onClick={(e: any) => e.stopPropagation()}>
          <Navbar />
        </div>

        <main
          className={`duration-[250ms] transition-all ${
            !isWindowSmall &&
            (expanded
              ? `duration-[250ms] transition-all`
              : `duration-[250ms] transition-all md:ml-[4.5rem]`)
          } duration-[250ms] transition-all fade-in`}
        >
          {/* Show overlay only if it's not the Izolime page, explore button hasn't been clicked, and the user hasn't visited before */}
          {!isExploreClicked && !isIzolimePage && !hasVisited && (
            <div className="fixed inset-0 z-50 flex flex-col items-center justify-center space-y-6 bg-black/95">
              <Image
                src="/Logo.webp"
                alt="Logo"
                width={96}
                height={96}
              />
              <p className="text-slate-300">BAUplus</p>
              <button
                onClick={handleExploreClick}
                className="rounded-lg bg-blue-600 px-6 py-3 text-lg font-semibold text-white"
              >
                Le të shohim më shumë
              </button>
            </div>
          )}

          <div>{children}</div>

          {isHomePage && (
            <>
              <Cards />
              <About />
              <Numbers />
            </>
          )}

          <Footer />
        </main>
      </div>
    </>
  );
};

export default Layout;
