import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const appServer = import.meta.env.VITE_APP_SERVER;

export const fetchMovies = createAsyncThunk("movies/getAll", async () => {
  const response = await axios.get(`${appServer}/movies`);
  return response.data;
});

export const addMovie = createAsyncThunk(
  "movies/addMovie",
  async (movieData) => {
    const response = await axios.post(`${appServer}/movies`, movieData);
    return response.data;
  }
);

export const updateMovie = createAsyncThunk(
  "movies/update",
  async ({ movieId, updatedData }) => {
    const response = await axios.post(
      `${appServer}/movies/${movieId}`,
      updatedData
    );

    return response.data;
  }
);

export const deleteMovie = createAsyncThunk(
  "movies/delete",
  async (movieId) => {
    const response = await axios.delete(`${appServer}/movies/${movieId}`);
    return response.data;
  }
);

const initialState = {
  movies: [],
  status: "idle",
  error: null,
};

export const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchMovies.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchMovies.fulfilled, (state, action) => {
      state.status = "success";
      state.movies = action.payload;
    });
    builder.addCase(fetchMovies.rejected, (state, action) => {
      state.status = "error";
      state.error = action.payload;
    });
    builder.addCase(addMovie.pending, (state) => {
      state.status = "adding";
    });
    builder.addCase(addMovie.fulfilled, (state, action) => {
      state.status = "added";
      state.movies.push(action.payload);
    });
    builder.addCase(addMovie.rejected, (state, action) => {
      state.status = "error";
      state.error = action.payload;
    });
    builder.addCase(updateMovie.pending, (state) => {
      state.status = "updating";
    });
    builder.addCase(updateMovie.fulfilled, (state, action) => {
      state.status = "updated";
      const movieIndex = state.movies.findIndex(
        (movie) => movie._id === action.payload._id
      );
      state.movies[movieIndex] = action.payload;
    });
    builder.addCase(updateMovie.rejected, (state, action) => {
      state.status = "error";
      state.error = action.payload;
    });
    builder.addCase(deleteMovie.pending, (state) => {
      state.status = "deleting";
    });
    builder.addCase(deleteMovie.fulfilled, (state, action) => {
      state.status = "deleted";
      state.movies = state.movies.filter(
        (movie) => movie._id != action.payload._id
      );
    });
    builder.addCase(deleteMovie.rejected, (state, action) => {
      state.status = "error";
      state.error = action.payload;
    });
  },
});

export default movieSlice.reducer;
