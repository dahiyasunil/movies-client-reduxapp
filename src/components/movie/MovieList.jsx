import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { deleteMovie } from "../../features/movieSlice";

const MovieList = ({ movies }) => {
  const dispatch = useDispatch();

  const deleteHandler = (movieId) => {
    dispatch(deleteMovie(movieId));
  };

  return (
    <div className="row">
      {movies?.map((movie) => (
        <div className="col-12 col-md-6 col-lg-3" key={movie._id}>
          <div className="card mb-3">
            <div className="card-body">
              <h5 className="card-title">{movie.title}</h5>
              <p className="card-text">
                <small>
                  <span className="text-secondary">
                    {movie.directors.length > 1 ? "Directors" : "Director"}:{" "}
                  </span>
                  {movie.directors.join(", ")}
                </small>
              </p>
              <p className="card-text">
                <small>
                  <span className="text-secondary">Genre: </span>
                  <span>
                    {movie.genre.join(", ").length > 25
                      ? `${movie.genre.join(", ").slice(0, 25)}...`
                      : movie.genre.join(", ")}
                  </span>
                </small>
              </p>
              <Link
                to="/manage/update"
                className="btn btn-sm btn-warning opacity-75 px-5 px-lg-4"
                state={movie}
              >
                <small className="fw-semibold">Update</small>
              </Link>
              <button
                className="btn btn-sm btn-danger opacity-75 px-5 px-lg-4 float-end"
                onClick={() => deleteHandler(movie._id)}
              >
                <small className="fw-semibold text-dark">Delete</small>
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MovieList;
