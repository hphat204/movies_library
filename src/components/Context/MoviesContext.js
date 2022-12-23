import React, { createContext, useContext, useEffect, useReducer, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const MoviesContext = createContext();
const MoviesDispatchContext = createContext();
const SearchContext = createContext();

export const useMovies = () => {
  return useContext(MoviesContext);
};

export const useMovieDispatch = () => {
  return useContext(MoviesDispatchContext);
};

export const useSearch = () => {
  return useContext(SearchContext);
};

const reducer = (state, action) => {
  let movieList = action.payload.list;
  if (movieList === "") movieList = "movies";
  function checkListLengthAndReturnList(list) {
    if (!list.length) return list;
  }
  function updateMovieFromList(list) {
    checkListLengthAndReturnList(list);
    return list.map((mov) => (mov.id === action.payload.id ? action.payload.movie : mov));
  }
  function deleteMovieFromList(list) {
    checkListLengthAndReturnList(list);
    return list.filter((mov) => mov.id !== action.payload.id);
  }

  switch (action.type) {
    case "CREATE_MOVIE":
      return {
        ...state,
        [movieList]: [...state[movieList], newMovie(action.payload.movie)],
      };
    case "ADD_MOVIE":
      const isMovieInList = state[movieList].find((mov) => mov.id === action.payload.foundMovie.id);
      if (isMovieInList) return state;
      return { ...state, [movieList]: [...state[movieList], action.payload.foundMovie] };
    case "UPDATE_MOVIE":
      return {
        ...state,
        movies: updateMovieFromList(state.movies),
        watchedMovies: updateMovieFromList(state.watchedMovies),
        savedMovies: updateMovieFromList(state.savedMovies),
        likedMovies: updateMovieFromList(state.likedMovies),
      };
    case "DELETE_MOVIE":
      if (movieList === "movies") {
        return {
          ...state,
          movies: deleteMovieFromList(state.movies),
          watchedMovies: deleteMovieFromList(state.watchedMovies),
          savedMovies: deleteMovieFromList(state.savedMovies),
          likedMovies: deleteMovieFromList(state.likedMovies),
        };
      }
      return {
        ...state,
        [movieList]: [...state[movieList].filter((mov) => mov.id !== action.payload.id)],
      };
    case "SEARCH_MOVIE":
      return {
        ...state,
        searchMovies: [
          ...state[movieList].filter(
            (mov) =>
              mov.name.includes(action.payload.search) || mov.year.toString().includes(String(action.payload.search))
          ),
        ],
      };
    default:
      return state;
  }
};

function newMovie(movie) {
  return { ...movie, id: uuidv4(), date: new Date() };
}
const initialState = {
  movies: [],
  watchedMovies: [],
  savedMovies: [],
  likedMovies: [],
  searchMovies: [],
};

export default function MoviesProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, getLocalStorage(initialState));
  const [isSearching, setIsSearching] = useState(false);

  function getLocalStorage(initialState) {
    const getMoviesStorage = localStorage.getItem("movies");
    if (!getMoviesStorage) return initialState;
    return JSON.parse(getMoviesStorage);
  }
  useEffect(() => {
    localStorage.setItem("movies", JSON.stringify(state));
  }, [state]);
  return (
    <MoviesContext.Provider value={state}>
      <MoviesDispatchContext.Provider value={dispatch}>
        <SearchContext.Provider value={{ isSearching, setIsSearching }}>{children}</SearchContext.Provider>
      </MoviesDispatchContext.Provider>
    </MoviesContext.Provider>
  );
}
