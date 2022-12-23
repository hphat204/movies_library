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
    <div className="container-fluid justify-content-center " style={{ height: "100vh" }}>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 row-cols-lg-5 mt-3 g-4">
        {likedMovies.length ? (
          likedMovies.map((movie) => {
            return (
              <div key={movie.id} className="col col-xs-12 d-flex justify-content-center">
                <Movies movie={movie} />
              </div>
            );
          })
        ) : (
          <p className="m-auto fst-italic">trang chưa có phim được lưu ...</p>
        )}
      </div>
    </div>
  );
}
