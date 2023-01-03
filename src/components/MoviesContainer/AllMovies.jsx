import React from "react";
import Movies from "./Movies";
import { useMovies } from "../Context/MoviesContext";
import { useSearch } from "../Context/MoviesContext";
import SearchComponent from "../SearchComponent/SearchComponent";

export default function AllMovies() {
  const { movies } = useMovies();
  const { isSearching } = useSearch();

  if (isSearching) return <SearchComponent />;
  return (
    <>
      {movies.length > 0 ? (
        movies.map((movie) => {
          if (!movie) return "";
          return (
            <div key={movie.id} className="col col-xs-12 d-flex justify-content-center">
              <Movies movie={movie} />
            </div>
          );
        })
      ) : (
        <p className="m-auto fst-italic mt-3">trang chưa có phim được lưu ...</p>
      )}
    </>
  );
}
