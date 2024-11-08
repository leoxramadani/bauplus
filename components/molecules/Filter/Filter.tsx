import { useEffect } from 'react';

type MovieType = {
  id: number;
  title: string;
  genre_ids: number[];
  backdrop_path: string;
};

type FilterProps = {
  popular: MovieType[];
  setFiltered: (movies: MovieType[]) => void;
  activeGenre: number;
  setActiveGenre: (genre: number) => void;
};

const Filter: React.FC<FilterProps> = ({
  popular,
  setFiltered,
  activeGenre,
  setActiveGenre,
}) => {
  useEffect(() => {
    const filteredMovies =
      activeGenre === 0
        ? popular
        : popular.filter((movie) =>
            movie.genre_ids.includes(activeGenre)
          );

    setFiltered(filteredMovies);
  }, [activeGenre, popular, setFiltered]);

  return (
    <div
      className={` top-3 z-10 my-4 flex justify-center transition-opacity duration-300`}
    >
      <button
        className={`mr-4 rounded-lg border-2  p-1 font-light ${
          activeGenre === 4
            ? 'border-white bg-slate-500 text-white'
            : 'text-black-600 border-slate-500 bg-slate-500'
        }`}
        onClick={() => setActiveGenre(4)}
      >
        Skele
      </button>
      <button
        className={`mr-4 rounded-lg border-2 p-1 font-light ${
          activeGenre === 35
            ? 'border-white bg-slate-500 text-white'
            : 'text-black-600 border-slate-500 bg-slate-500'
        }`}
        onClick={() => setActiveGenre(35)}
      >
        Dekorime
      </button>
      <button
        className={`mr-4 rounded-lg border-2 p-1 font-light ${
          activeGenre === 28
            ? 'border-white bg-slate-500 text-white'
            : 'text-black-600 border-slate-500 bg-slate-500'
        }`}
        onClick={() => setActiveGenre(28)}
      >
        Izolime
      </button>
      <button
        className={`mr-4 rounded-lg border-2 p-1 font-light ${
          activeGenre === 0
            ? 'border-white bg-slate-500 text-white'
            : 'text-black-600 border-slate-500 bg-slate-500'
        }`}
        onClick={() => setActiveGenre(0)}
      >
        Të gjitha
      </button>
    </div>
  );
};

export default Filter;
