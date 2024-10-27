import { ImageList, ImageListItem } from '@mui/material';
import { useEffect, useState } from 'react';

export default function Izolime() {
  const images = [
    '/izolime1.webp',
    '/Izolime2.webp',
    '/Izolime3.webp',
    '/Izolime4.webp',
    '/Izolime5.webp',
    '/Izolime6.webp',
    '/Izolime7.webp',
    '/Izolime8.webp',
    '/Izolime9.webp',
    '/izolime10.webp',
    '/izolime11.webp',
    '/izolime12.webp',
    '/izolime14.webp',
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
        <h3>Izolime</h3>
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
