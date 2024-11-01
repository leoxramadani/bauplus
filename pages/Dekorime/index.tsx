'use client';

import WhyUs from '@/components/molecules/WhyUs/WhyUs';
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

  return (
    <div>
      <div className="flex h-auto w-full flex-col px-[15px]">
        <div className="mt-[70px] h-auto w-full pl-4 text-center font-serif text-[22px] text-slate-600">
          <h3>Dekorime</h3>
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
