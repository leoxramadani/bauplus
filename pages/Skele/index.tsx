'use client';

import { ImageList, ImageListItem } from '@mui/material';
import { useEffect, useState } from 'react';

function Skele() {
  const images = [
    '/skele1.webp',
    '/skele2.webp',
    '/skele3.webp',
    '/skele4.webp',
    '/skele5.webp',
    '/skele6.webp',
    '/skele7.webp',
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
    <div className="flex h-auto w-full flex-col px-[15px]">
      <div className="mt-[70px] h-auto w-full pl-4 text-center font-serif text-[22px] text-slate-600">
        <h3>Skele</h3>
      </div>

      <ImageList
        variant="masonry"
        cols={imageListProps.cols}
        gap={imageListProps.gap}
      >
        {images.map((src, index) => (
          <ImageListItem key={index}>
            <img
              src={`${src}?w=248&fit=crop&auto=format`}
              srcSet={`${src}?w=248&fit=crop&auto=format&dpr=2 2x`}
              alt={`Gallery image ${index + 1}`}
              loading="lazy"
              className="object-cover transition-transform duration-300 hover:scale-105"
            />
          </ImageListItem>
        ))}
      </ImageList>
    </div>
  );
}

export default Skele;
