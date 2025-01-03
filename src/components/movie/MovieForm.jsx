import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { addMovie, updateMovie } from "../../features/movieSlice";

const MovieForm = () => {
  const dispatch = useDispatch();
  const { operation } = useParams();
  const movieDetails = useLocation().state;
  const navigate = useNavigate();

  const { status, error } = useSelector((state) => state.movies);

  const [movieData, setMovieData] = useState({
    title: "",
    releaseYear: null,
    genre: [],
    directors: [],
    actors: [],
    rating: null,
    plot: "",
    posterUrl: "",
  });
  const [disabled, setDisabled] = useState("");

  const setDefaultMovieData = () => {
    setMovieData({
      title: "",
      releaseYear: null,
      genre: [],
      directors: [],
      actors: [],
      rating: null,
      plot: "",
      posterUrl: "",
    });
  };

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setMovieData((prev) => ({
      ...prev,

      [name]:
        name === "genre" || name === "directors" || name === "actors"
          ? value.split(",").map((v) => v.trim())
          : name === "releaseYear" || name === "rating"
          ? value
            ? parseFloat(value)
            : ""
          : value,
    }));
  };

  useEffect(() => {
    if (operation === "update" && movieDetails) {
      setMovieData({
        title: movieDetails.title || "",
        releaseYear: movieDetails.releaseYear || null,
        genre: movieDetails.genre || [],
        directors: movieDetails.directors || [],
        actors: movieDetails.actors || [],
        rating: movieDetails.rating || null,
        plot: movieDetails.plot || "",
        posterUrl: movieDetails.posterUrl || "",
      });
    } else {
      setDefaultMovieData();
    }
  }, [movieDetails]);

  useEffect(() => {
    if (status === "added") {
      setDefaultMovieData();
      setDisabled("");
    }
  }, [status]);

  const submitHandler = async (e) => {
    e.preventDefault();
    setDisabled("disabled");
    if (operation === "add") {
      dispatch(addMovie(movieData));
    }
    if (operation === "update") {
      dispatch(
        updateMovie({ movieId: movieDetails._id, updatedData: movieData })
      );
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }
  };

  return (
    <section>
      <h1>{operation === "add" ? "Add" : "Update"} Movie</h1>
      <form onSubmit={submitHandler}>
        <div className="row">
          <div className="col col-lg-6">
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="movieTitle"
                name="title"
                id="title"
                value={movieData.title ?? ""}
                onChange={changeHandler}
                required
              />
              <label htmlFor="title">Title</label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="number"
                className="form-control"
                placeholder="2000"
                name="releaseYear"
                id="releaseYear"
                min="1800"
                max={new Date().getFullYear()}
                value={movieData.releaseYear ?? ""}
                onChange={changeHandler}
                required
              />
              <label htmlFor="releaseYear">Release Year</label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="drama"
                name="genre"
                id="genre"
                value={movieData.genre.join(",") ?? ""}
                onChange={changeHandler}
              />
              <label htmlFor="genre">Genre</label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="director"
                name="directors"
                id="directors"
                value={movieData.directors.join(",") ?? ""}
                onChange={changeHandler}
                required
              />
              <label htmlFor="directors">Directors</label>
            </div>
          </div>
          <div className="col col-lg-6">
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="actors"
                name="actors"
                id="actors"
                value={movieData.actors.join(",") ?? ""}
                onChange={changeHandler}
                required
              />
              <label htmlFor="actors">Actors</label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="number"
                step="0.1"
                min="0"
                max="5"
                className="form-control"
                placeholder="3"
                name="rating"
                id="rating"
                value={movieData.rating ?? ""}
                onChange={changeHandler}
              />
              <label htmlFor="rating">Rating</label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="plot"
                name="plot"
                id="plot"
                value={movieData.plot ?? ""}
                onChange={changeHandler}
              />
              <label htmlFor="plot">Plot</label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="posterUrl"
                name="posterUrl"
                id="posterUrl"
                value={movieData.posterUrl ?? ""}
                onChange={changeHandler}
              />
              <label htmlFor="posterUrl">Poster Url</label>
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-end">
          <button type="submit" className={`btn btn-primary px-5 ${disabled}`}>
            {status === "adding" ? (
              <div className="spinner-border text-secondary mb-3">
                <span className="visually-hidden">waiting...</span>
                {operation === "add" ? "Adding" : "Updating"}...
              </div>
            ) : (
              `${operation === "add" ? "Add" : "Update"} Movie`
            )}
          </button>
        </div>
      </form>
      {status === "error" && (
        <div className="col-lg-6">
          <p className="text-danger">An error occured. Error: {error}</p>
        </div>
      )}
    </section>
  );
};

export default MovieForm;
