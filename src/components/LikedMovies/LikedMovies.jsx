import React from "react";
import { useMovies } from "../Context/MoviesContext";
import Movies from "../MoviesContainer/Movies";
import { useSearch } from "../Context/MoviesContext";
import SearchComponent from "../SearchComponent/SearchComponent";

export default function LikedMovies() {
  const { likedMovies } = useMovies();
  const { isSearching } = useSearch();

  if (isSearching) return <SearchComponent />;
  return (
    <>
      {likedMovies.length ? (
        likedMovies.map((movie) => {
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
