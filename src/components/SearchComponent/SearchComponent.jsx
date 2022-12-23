import React from "react";
import { useMovies } from "../Context/MoviesContext";
import Movies from "../MoviesContainer/Movies";

export default function SearchComponent() {
  const { searchMovies } = useMovies();
  return (
    <div className="container-fluid justify-content-center " style={{ height: "100vh" }}>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 row-cols-lg-5 mt-3 g-4">
        {searchMovies.length ? (
          searchMovies.map((movie) => {
            return (
              <div key={movie.id} className="col col-xs-12 d-flex justify-content-center">
                <Movies movie={movie} />
              </div>
            );
          })
        ) : (
          <p className="m-auto fst-italic">không tìm thấy phim vui lòng nhập lại</p>
        )}
      </div>
    </div>
  );
}
