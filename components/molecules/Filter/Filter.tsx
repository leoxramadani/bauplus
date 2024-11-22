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
        className={`font sans mr-4 rounded-lg border-2 p-1 px-4 py-2 font-sans font-light  ${
          activeGenre === 4
            ? 'border-black bg-blue-500 text-white'
            : 'border-blue-500 bg-slate-300 text-blue-500'
        }`}
        onClick={() => setActiveGenre(4)}
      >
        Skele
      </button>
      <button
        className={`mr-4 rounded-lg border-2 p-1 font-sans font-light ${
          activeGenre === 35
            ? 'border-black bg-blue-500 text-white'
            : 'border-blue-500 bg-slate-300 text-blue-500'
        }`}
        onClick={() => setActiveGenre(35)}
      >
        Dekorime
      </button>
      <button
        className={`mr-4 rounded-lg border-2 p-1 font-sans font-light ${
          activeGenre === 28
            ? 'border-black bg-blue-500 text-white'
            : 'border-blue-500 bg-slate-300 text-blue-500'
        }`}
        onClick={() => setActiveGenre(28)}
      >
        Izolime
      </button>
      <button
        className={`font sans mr-4 rounded-lg border-2 p-1 font-light ${
          activeGenre === 0
            ? 'border-black bg-blue-500 text-white'
            : 'border-blue-500 bg-slate-300 text-blue-500'
        }`}
        onClick={() => setActiveGenre(0)}
      >
        Të gjitha
      </button>
    </div>
  );
};

export default Filter;
