const MovieList = ({ movies }) => {
  const deleteHandler = (movieId) => {};

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
                  <p>{movie.genre.join(", ")}</p>
                </small>
              </p>
              <button className="btn btn-sm btn-warning opacity-75 px-5 px-lg-4">
                <small className="fw-semibold">Update</small>
              </button>
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
