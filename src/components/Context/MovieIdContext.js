import React, { createContext, useContext, useState } from "react";

const MovieIdContext = createContext();

export const useMovieId = () => {
  return useContext(MovieIdContext);
};

export default function MovieIdProvider({ children }) {
  const [movieId, setMovieId] = useState("");
  return <MovieIdContext.Provider value={{ movieId, setMovieId }}>{children}</MovieIdContext.Provider>;
}
