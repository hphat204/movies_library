import { useEffect, useState } from "react";
import { Link, useHref } from "react-router-dom";
import FormModal from "../FormModal/FormModal";
import { useLoading } from "../Context/LoadingContext";
import { useMovieId } from "../Context/MovieIdContext";
import { useMovieDispatch } from "../Context/MoviesContext";
import { useSearch } from "../Context/MoviesContext";

export default function NavBar() {
  const { setLoading } = useLoading();
  const { setMovieId } = useMovieId();
  const getMovieListFromUrl = useHref().slice(1);
  const { setIsSearching } = useSearch();
  const dispatch = useMovieDispatch();
  const [search, setSearch] = useState("");
  useEffect(() => {
    if (search.length === 0) {
      setIsSearching(false);
      return;
    }
    setIsSearching(true);
    dispatch({ type: "SEARCH_MOVIE", payload: { search: search.toLowerCase(), list: getMovieListFromUrl } });
  }, [search, getMovieListFromUrl, dispatch, setIsSearching]);

  function handleLoading(e) {
    removeAndAddActiveLink(e);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }
  function removeAndAddActiveLink(e) {
    const navLink = document.querySelectorAll(".nav-link");
    navLink.forEach((link) => {
      link.classList.remove("active", "bg-secondary", "rounded");
    });
    if (e.target.classList.contains("navbar-brand")) return;
    e.target.classList.add("active", "bg-secondary", "rounded");
  }
  return (
    <nav className="navbar navbar-expand navbar-dark bg-dark">
      <FormModal />
      <div className="container-fluid flex-wrap">
        <Link
          to="/"
          onClick={handleLoading}
          className="navbar-brand h1 fs-4 text-danger nav-link col-12 col-lg-1 text-center me-auto"
        >
          MoviesLibary
        </Link>
        <ul className="navbar-nav col-12 col-lg-5 mb-2 ">
          <li className="nav-item">
            <Link to="/" className="nav-link" onClick={handleLoading}>
              Trang chủ
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/watchedMovies" onClick={handleLoading} className="nav-link">
              Phim đã xem
            </Link>
          </li>
          <li className="nav-item ">
            <Link to="/savedMovies" onClick={handleLoading} className="nav-link">
              Phim lưu xem sau
            </Link>
          </li>
          <li className="nav-item ">
            <Link to="/likedMovies" onClick={handleLoading} className="nav-link">
              Phim yêu thích
            </Link>
          </li>
        </ul>

        <form className="d-flex col-6 col-lg-3 me-2" role="search">
          <input
            className="form-control shadow-none bg-dark text-white"
            onChange={(e) => setSearch(e.target.value)}
            type="search"
            placeholder="Tìm phim theo tên, năm và thể loại"
            aria-label="Search"
          />
        </form>
        <button
          type="button"
          onClick={() => setMovieId(null)}
          className="btn btn-danger col-5 col-lg-2"
          data-bs-toggle="modal"
          data-bs-target="#Modal"
        >
          Thêm phim
        </button>
      </div>
    </nav>
  );
}
