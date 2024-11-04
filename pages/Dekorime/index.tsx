'use client';

import WhyUs from '@/components/molecules/WhyUs/WhyUs';
import { useTheme } from '@/lib/contexts/ThemeContext';
import { ImageList, ImageListItem } from '@mui/material';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

function Dekorime() {
  const images = [
    '/dekorime1.webp',
    '/dekorime2.webp',
    '/dekorime3.webp',
    '/dekorime4.webp',
    '/dekorime5.webp',
    '/dekorime6.webp',
    '/dekorime7.webp',
    '/dekorime8.webp',
    '/dekorime9.webp',
    '/dekorime10.webp',
    '/dekorime11.webp',
    '/dekorime12.webp',
    '/dekorime13.webp',
    '/dekorime14.webp',
  ];

  const getImageListProps = (width: number) => {
    if (width < 640) {
      return { cols: 1, gap: 4 };
    } else if (width < 768) {
      return { cols: 2, gap: 8 };
    } else if (width < 1024) {
      return { cols: 3, gap: 8 };
    } else {
      return { cols: 4, gap: 8 };
    }
  };

  const [imageListProps, setImageListProps] = useState({
    cols: 4,
    gap: 8,
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleResize = () => {
        setImageListProps(getImageListProps(window.innerWidth));
      };

      handleResize();

      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  }, []);

  const { isDarkMode } = useTheme();
  const [isOpen, setIsOpen] = useState(true);

  const toggleContent = () => {
    setIsOpen(!isOpen);
  }; // Corrected function closure

  return (
    <div>
      <div className="flex flex-col items-center">
        <div
          className={`card1 relative flex h-[380px] w-[100vw] flex-col items-center justify-center bg-transparent`}
        >
          <div className="sketchfab-embed-wrapper mx-[5vw] h-[80vh] w-[90vw] bg-slate-200">
            <iframe
              className="h-full w-full bg-slate-200"
              title="3D_Building_Construction"
              allow="autoplay; fullscreen; xr-spatial-tracking"
              src="https://sketchfab.com/models/c1248d260eed44e789c566ea0610af6e/embed?autospin=1&autostart=1"
            />
          </div>
        </div>
        <div
          className="my-[20px] flex h-[30px] w-full cursor-pointer items-center justify-center font-serif text-[22px]"
          onClick={toggleContent}
        >
          <h2
            className={`flex text-[24px] ${
              isDarkMode ? 'text-slate-200' : 'text-slate-600'
            }`}
          >
            Më shumë për dekorimet e shtëpive
          </h2>
          <span
            className={`transition-transform duration-300 ${
              isOpen ? 'rotate-180' : 'rotate-0'
            } ${isDarkMode ? 'text-slate-200' : 'text-slate-600'}`}
          >
            {isOpen ? '▲' : '▼'}
          </span>
        </div>
        <div
          className={`overflow-hidden transition-all duration-500 ease-in-out ${
            isOpen ? 'max-h-screen' : 'max-h-0'
          }`}
        >
          <div className="mb-[20px] flex h-auto w-full justify-center">
            <div className="flex h-auto w-[100%] flex-col pt-[5px] sm:w-[50%] sm:pt-[10px]">
              <h3
                className={`px-[20px] text-justify font-serif ${
                  isDarkMode ? 'text-slate-200' : 'text-slate-600'
                }`}
              >
                <b>BAUplus</b> ofron shërbime të specializuara për
                dekorimin e ambienteve të brendshme, duke përdorur
                materiale cilësore si gipsi dhe tapeta dekorative për
                t&#39i dhënë çdo hapësire një pamje elegante dhe
                funksionale. Ekipi ynë profesionist ka përvojë të
                gjerë në krijimin e dizajneve unike që kombinojnë
                stilin modern me preferencat personale të klientëve.
                Nga instalimi i profileve dhe tavaneve prej gipsi që i
                japin karakter dhe strukturë dhomës, deri te
                përzgjedhja dhe vendosja e tapetave dekorative që
                krijojnë atmosferë të ngrohtë dhe tërheqëse, ne
                sigurohemi që çdo projekt të realizohet me përpikëri
                dhe kujdes për detajet.
              </h3>
            </div>
          </div>
        </div>
        <ImageList
          variant="masonry"
          cols={imageListProps.cols}
          gap={imageListProps.gap}
        >
          {images.map((src, index) => (
            <ImageListItem key={index}>
              <motion.img
                src={`${src}?w=248&fit=crop&auto=format`}
                srcSet={`${src}?w=248&fit=crop&auto=format&dpr=2 2x`}
                alt={`Gallery image ${index + 1}`}
                loading="lazy"
                initial={{ opacity: 0, y: 20 }} // Start state
                animate={{ opacity: 1, y: 0 }} // End state
                transition={{ duration: 0.5, delay: index * 0.1 }} // Transition settings
                className="object-cover transition-transform duration-300 hover:scale-105"
              />
            </ImageListItem>
          ))}
        </ImageList>
      </div>
      <WhyUs />
    </div>
  );
}

export default Dekorime;
