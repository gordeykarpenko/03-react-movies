import type { MouseEvent } from "react";
import type { Movie } from "../../types/movie";
import css from "./MovieGrid.module.css";

interface MovieGridProps {
  movies: Movie[];
  onSelect: (movie: Movie) => void;
}

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

const MovieGrid = ({ movies, onSelect }: MovieGridProps) => {
  const handleClick = (event: MouseEvent<HTMLDivElement>, movie: Movie) => {
    event.currentTarget.blur();
    onSelect(movie);
  };

  return (
    <ul className={css.grid}>
      {movies.map((movie) => (
        <li key={movie.id}>
          <div
            className={css.card}
            role="button"
            tabIndex={0}
            onClick={(event) => handleClick(event, movie)}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                onSelect(movie);
              }
            }}
          >
            {movie.poster_path ? (
              <img
                className={css.image}
                src={`${IMAGE_BASE_URL}${movie.poster_path}`}
                alt={movie.title}
                loading="lazy"
              />
            ) : (
              <div className={css.image} aria-label="No poster available" />
            )}
            <h2 className={css.title}>{movie.title}</h2>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default MovieGrid;
