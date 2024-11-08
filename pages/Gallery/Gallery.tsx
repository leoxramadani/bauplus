// pages/index.tsx
import Filter from '@/components/molecules/Filter/Filter';
import Movie from '@/components/molecules/Movie/Movie';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

type MovieType = {
  id: number;
  title: string;
  genre_ids: number[];
  backdrop_path: string;
};

const Gallery: React.FC = () => {
  const [popular, setPopular] = useState<MovieType[]>([]);
  const [filtered, setFiltered] = useState<MovieType[]>([]);
  const [activeGenre, setActiveGenre] = useState(4);

  useEffect(() => {
    console.log('Current active genre:', activeGenre);

    const localMovies = [
      {
        id: 1,
        title: 'Dekorime1',
        genre_ids: [35],
        backdrop_path: '/dekorime1.webp',
      },
      {
        id: 2,
        title: 'Dekorime2',
        genre_ids: [35],
        backdrop_path: '/dekorime2.webp',
      },
      {
        id: 3,
        title: 'Dekorime3',
        genre_ids: [35],
        backdrop_path: '/dekorime3.webp',
      },
      {
        id: 4,
        title: 'Dekorime4',
        genre_ids: [35],
        backdrop_path: '/dekorime4.webp',
      },
      {
        id: 5,
        title: 'Dekorime5',
        genre_ids: [35],
        backdrop_path: '/dekorime5.webp',
      },
      {
        id: 6,
        title: 'Dekorime6',
        genre_ids: [35],
        backdrop_path: '/dekorime6.webp',
      },
      {
        id: 7,
        title: 'Dekorime7',
        genre_ids: [35],
        backdrop_path: '/dekorime7.webp',
      },
      {
        id: 8,
        title: 'Dekorime8',
        genre_ids: [35],
        backdrop_path: '/dekorime8.webp',
      },
      {
        id: 9,
        title: 'Dekorime9',
        genre_ids: [35],
        backdrop_path: '/dekorime9.webp',
      },
      {
        id: 10,
        title: 'Dekorime10',
        genre_ids: [35],
        backdrop_path: '/dekorime10.webp',
      },
      {
        id: 11,
        title: 'Dekorime11',
        genre_ids: [35],
        backdrop_path: '/dekorime11.webp',
      },
      {
        id: 12,
        title: 'Dekorime12',
        genre_ids: [35],
        backdrop_path: '/dekorime12.webp',
      },
      {
        id: 13,
        title: 'Dekorime13',
        genre_ids: [35],
        backdrop_path: '/dekorime13.webp',
      },
      {
        id: 14,
        title: 'Dekorime14',
        genre_ids: [35],
        backdrop_path: '/dekorime14.webp',
      },
      {
        id: 15,
        title: 'Izolime1',
        genre_ids: [28],
        backdrop_path: '/izolime1.webp',
      },
      {
        id: 16,
        title: 'Izolime2',
        genre_ids: [28],
        backdrop_path: '/izolime2.webp',
      },
      {
        id: 17,
        title: 'Izolime3',
        genre_ids: [28],
        backdrop_path: '/izolime3.webp',
      },
      {
        id: 18,
        title: 'Izolime4',
        genre_ids: [28],
        backdrop_path: '/izolime4.webp',
      },
      {
        id: 19,
        title: 'Izolime5',
        genre_ids: [28],
        backdrop_path: '/izolime5.webp',
      },
      {
        id: 20,
        title: 'Izolime6',
        genre_ids: [28],
        backdrop_path: '/izolime6.webp',
      },
      {
        id: 21,
        title: 'Izolime7',
        genre_ids: [28],
        backdrop_path: '/izolime7.webp',
      },
      {
        id: 22,
        title: 'Izolime8',
        genre_ids: [28],
        backdrop_path: '/izolime8.webp',
      },
      {
        id: 23,
        title: 'Izolime9',
        genre_ids: [28],
        backdrop_path: '/izolime9.webp',
      },
      {
        id: 24,
        title: 'Izolime10',
        genre_ids: [28],
        backdrop_path: '/izolime10.webp',
      },
      {
        id: 25,
        title: 'Izolime11',
        genre_ids: [28],
        backdrop_path: '/izolime11.webp',
      },
      {
        id: 26,
        title: 'skele1',
        genre_ids: [4],
        backdrop_path: '/skele1.webp',
      },
      {
        id: 27,
        title: 'skele2',
        genre_ids: [4],
        backdrop_path: '/skele2.webp',
      },
      {
        id: 28,
        title: 'skele3',
        genre_ids: [4],
        backdrop_path: '/skele3.webp',
      },
      {
        id: 29,
        title: 'skele4',
        genre_ids: [4],
        backdrop_path: '/skele4.webp',
      },
      {
        id: 30,
        title: 'skele5',
        genre_ids: [4],
        backdrop_path: '/skele5.webp',
      },
      {
        id: 31,
        title: 'skele6',
        genre_ids: [4],
        backdrop_path: '/skele6.webp',
      },
      {
        id: 32,
        title: 'skele7',
        genre_ids: [4],
        backdrop_path: '/skele7.webp',
      },
    ];
    setPopular(localMovies);
    setFiltered(localMovies);
  }, []);

  return (
    <div className="mt-10 bg-white/10 p-4">
      <h2 className={` text-center text-[24px] text-slate-200`}>
        Galerija
      </h2>{' '}
      <Filter
        popular={popular}
        setFiltered={setFiltered}
        activeGenre={activeGenre}
        setActiveGenre={setActiveGenre}
      />
      <motion.div
        layout
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3"
      >
        <AnimatePresence mode="wait">
          {filtered.map((movie) => (
            <Movie key={movie.id} movie={movie} />
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default Gallery;
