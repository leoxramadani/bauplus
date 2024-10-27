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
  const [hasVisited, setHasVisited] = useState<boolean>(false);

  // Check localStorage for visit status on route change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const visited = localStorage.getItem('visited');
      setHasVisited(visited === 'true');
      setExploreClicked(!visited && router.pathname === '/');
    }
  }, [router.pathname, setExploreClicked]);

  // Handle window resizing
  useEffect(() => {
    const handleResize = () => {
      setIsWindowSmall(window.innerWidth < 768);
      if (window.innerWidth > 768) {
        setIsOpen(false); // Assuming you want to close the sidebar on larger screens
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Toggle sidebar
  const toggleSidebar = () => {
    setExpanded((prev) => !prev);
  };

  // Loading state
  if (status === 'loading') return <Loading />;

  // Handle explore button click
  const handleExploreClick = () => {
    localStorage.setItem('visited', 'true');
    setExploreClicked(true);
    document.body.style.overflow = 'auto';
  };

  // Control body overflow based on explore button state
  useEffect(() => {
    document.body.style.overflow = isExploreClicked
      ? 'auto'
      : 'hidden';
  }, [isExploreClicked]);

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
          className={`duration-250 transition-all fade-in ${
            !isWindowSmall && (expanded ? '' : 'md:ml-[4.5rem]')
          }`}
        >
          {/* Show overlay only if it's not the Izolime page, explore button hasn't been clicked, and the user hasn't visited before */}
          {!isExploreClicked &&
            !router.pathname.includes('/izolime') &&
            !hasVisited && (
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

          {router.pathname === '/' && (
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
