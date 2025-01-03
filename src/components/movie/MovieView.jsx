import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies } from "../../features/movieSlice";
import MovieList from "./MovieList";

const MovieView = () => {
  const dispatch = useDispatch();
  const { movies, status, error } = useSelector((state) => state.movies);

  useEffect(() => {
    dispatch(fetchMovies());
  }, []);

  if (status === "loading") {
    return (
      <div className="d-flex justify-content-center">
        <div className="spinner-border text-secondary">
          <span className="visually-hidden">Loading..</span>
        </div>
        <span className="ms-3 text-secondary">Loading...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="d-flex justify-content-center">
        <p className="text-danger">Error: {error}</p>
      </div>
    );
  }

  return (
    <div>
      <MovieList movies={movies} />
    </div>
  );
};

export default MovieView;
