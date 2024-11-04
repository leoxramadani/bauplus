import WhyUs from '@/components/molecules/WhyUs/WhyUs';
import { useTheme } from '@/lib/contexts/ThemeContext';
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

  const { isDarkMode } = useTheme();
  const [isOpen, setIsOpen] = useState(true);

  const toggleContent = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <div className="flex flex-col items-center">
        {/* <div
          className={`card1 relative flex h-[380px] w-[100vw] flex-col items-center justify-center bg-transparent`}
        >
          <div className="sketchfab-embed-wrapper mx-[5vw] h-[80vh] w-[90vw]">
            {' '}
            <iframe
              className="h-full w-full"
              title="3D_Building_Construction"
              allow="autoplay; fullscreen; xr-spatial-tracking"
              src="https://sketchfab.com/models/bae1baa8494b46b4abc8ded3fe5a0f52/embed?autospin=1&autostart=1"
            >
              {' '}
            </iframe>{' '}
          </div>
        </div> */}
        <div
          className="my-[20px] flex h-[30px] w-full cursor-pointer items-center justify-center font-serif text-[22px]"
          onClick={toggleContent}
        >
          <h2
            className={`flex text-[24px] ${
              isDarkMode ? 'text-slate-200' : 'text-slate-600'
            }`}
          >
            Më shumë për izolimet e shtëpive
          </h2>
          <span
            className={`transition-transform duration-300  ${
              isOpen ? 'rotate-180' : 'rotate-0'
            } ${isDarkMode ? 'text-slate-200' : 'text-slate-600'}`}
          >
            {isOpen ? '▲' : '▼'}{' '}
          </span>
        </div>
        <div
          className={`overflow-hidden transition-all duration-500 ease-in-out ${
            isOpen ? 'max-h-screen' : 'max-h-0'
          }`}
        >
          <div className="mb-[20px] flex h-auto w-full  justify-center">
            <div className="flex h-auto w-[100%] flex-col pt-[5px] sm:w-[50%] sm:pt-[10px]">
              <h3
                className={`px-[20px] text-justify font-serif ${
                  isDarkMode ? 'text-slate-200' : 'text-slate-600'
                }`}
              >
                <b>BAUplus</b> ofron një shërbim të specializuar për
                izolimin termik dhe akustik të shtëpive, ndërtesave
                dhe objekteve industriale, duke ndihmuar klientët të
                kursejnë energji dhe të përmirësojnë komoditetin e
                ambientit. Me materialet më cilësore dhe teknologjinë
                më të fundit, Bauplus garanton izolim efikas që
                parandalon humbjen e nxehtësisë gjatë dimrit dhe mban
                freskinë gjatë verës. Ky shërbim jo vetëm që ul kostot
                e ngrohjes dhe ftohjes, por gjithashtu rrit
                jetëgjatësinë e ndërtesave duke mbrojtur strukturën e
                tyre nga ndikimet e jashtme.
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
      <WhyUs />
    </div>
  );
}
