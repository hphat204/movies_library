import React from "react";
import { useMovies } from "../Context/MoviesContext";
import Movies from "../MoviesContainer/Movies";

export default function SearchComponent() {
  const { searchMovies } = useMovies();
  return (
    <>
      {searchMovies.length ? (
        searchMovies.map((movie) => {
          return (
            <div key={movie.id} className="col col-xs-12 d-flex justify-content-center">
              <Movies movie={movie} />
            </div>
          );
        })
      ) : (
        <p className="m-auto fst-italic mt-3">không tìm thấy phim vui lòng nhập lại</p>
      )}
    </>
  );
}
