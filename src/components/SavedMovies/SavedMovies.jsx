import { useMovies } from "../../Context/MoviesContext";
import Movies from "../MoviesContainer/Movies";
import { useSearch } from "../../Context/MoviesContext";
import SearchComponent from "../SearchComponent/SearchComponent";

export default function SavedMovies() {
  const { savedMovies } = useMovies();
  const { isSearching } = useSearch();

  if (isSearching) return <SearchComponent />;
  return (
    <>
      {savedMovies.length ? (
        savedMovies.map((movie) => {
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
