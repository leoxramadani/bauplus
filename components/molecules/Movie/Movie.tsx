// components/Movie.tsx
import { motion } from 'framer-motion';

type MovieProps = {
  movie: {
    backdrop_path: string;
  };
};

const Movie: React.FC<MovieProps> = ({ movie }) => {
  return (
    <motion.div
      layout
      animate={{ opacity: 1, scale: 1 }}
      initial={{ opacity: 0, scale: 0 }}
      exit={{ opacity: 0, scale: 0 }}
      className="text-center"
    >
      <img
        src={movie.backdrop_path}
        alt={movie.backdrop_path}
        className="mb-4 h-60 w-full rounded-lg object-cover"
      />
    </motion.div>
  );
};

export default Movie;
