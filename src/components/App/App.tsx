import { useCallback, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { fetchMovies } from "../../services/movieService";
import type { Movie } from "../../types/movie";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Loader from "../Loader/Loader";
import MovieGrid from "../MovieGrid/MovieGrid";
import MovieModal from "../MovieModal/MovieModal";
import SearchBar from "../SearchBar/SearchBar";
import css from "./App.module.css";

const App = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleSearch = async (query: string) => {
    setMovies([]);
    setHasError(false);
    setIsLoading(true);

    try {
      const data = await fetchMovies(query);
      if (data.results.length === 0) {
        toast.error("No movies found for your request.");
      }
      setMovies(data.results);
    } catch {
      setHasError(true);
      toast.error("There was an error, please try again...");
    } finally {
      setIsLoading(false);
    }
  };

  const closeModal = useCallback(() => setSelectedMovie(null), []);

  return (
    <div className={css.app}>
      <SearchBar onSubmit={handleSearch} />
      {isLoading && <Loader />}
      {hasError && !isLoading && <ErrorMessage />}
      {!isLoading && !hasError && movies.length > 0 && (
        <MovieGrid movies={movies} onSelect={setSelectedMovie} />
      )}
      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={closeModal} />
      )}
      <Toaster position="top-right" />
    </div>
  );
};

export default App;
