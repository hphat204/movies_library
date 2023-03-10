import React, { useState, useEffect } from "react";
import { useMovies } from "../../Context/MoviesContext";
import { useMovieDispatch } from "../../Context/MoviesContext";
import { useMovieId } from "../../Context/MovieIdContext";
import { useNavigate } from "react-router-dom";

export default function FormModal() {
  const { movies } = useMovies();
  const dispatch = useMovieDispatch();
  const { movieId, setMovieId } = useMovieId();
  const [movie, setMovie] = useState({
    name: "",
    category: [],
    year: "",
    img: "",
    content: "",
    directorAndWriter: [],
    actors: [],
  });
  const movieToEdit = movieId ? movies.find((mov) => mov.id === movieId) : null;
  const navigate = useNavigate();

  useEffect(() => {
    clearForm();
    if (movieToEdit) setMovie(movieToEdit);
  }, [movieToEdit]);

  const clearMovieIdAndForm = () => {
    setMovieId(null);
    clearForm();
  };
  const clearForm = () => {
    setMovie({ name: "", category: [], year: "", img: "", directorAndWriter: [], content: "", actors: [] });
  };
  function resetLinkStyle() {
    const navLink = document.querySelectorAll(".nav-link");
    navLink.forEach((link) => {
      link.classList.remove("active", "bg-secondary", "rounded");
    });
  }
  const handleSubmit = (e) => {
    try {
      e.preventDefault();
      if (movieId) {
        dispatch({ type: "UPDATE_MOVIE", payload: { id: movieId, movie: movie } });
      } else {
        dispatch({ type: "CREATE_MOVIE", payload: { movie: movie, list: "movies" } });
        resetLinkStyle();
        navigate("/");
      }
      clearMovieIdAndForm();
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="modal modal-lg fade" id="Modal" tabIndex="-1" aria-labelledby="ModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-4" id="exampleModalLabel">
                {movieId ? "S???a" : "Th??m"} phim
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                onClick={clearMovieIdAndForm}
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col">
                  <label htmlFor="name" className="form-label">
                    T??n phim
                  </label>
                  <div className="input-group mb-3">
                    <input
                      type="text"
                      className="form-control"
                      autoComplete="off"
                      value={movie.name}
                      onChange={(e) => setMovie((prev) => ({ ...prev, name: e.target.value }))}
                      placeholder="nh???p t??n phim ..."
                      id="name"
                    />
                  </div>
                  <label htmlFor="category" className="form-label">
                    Th??? lo???i
                  </label>
                  <div className="input-group mb-3">
                    <input
                      type="text"
                      className="form-control"
                      autoComplete="off"
                      value={movie.category}
                      onChange={(e) => setMovie((prev) => ({ ...prev, category: [...e.target.value.split(",")] }))}
                      placeholder="th??m nhi???u th??? lo???i b???ng d???u ph???y gi???a c??c th??? lo???i"
                      id="category"
                    />
                  </div>
                  <label htmlFor="year" className="form-label">
                    N??m ph??t h??nh
                  </label>
                  <div className="input-group mb-3">
                    <input
                      type="text"
                      className="form-control"
                      autoComplete="off"
                      value={movie.year}
                      onChange={(e) => setMovie((prev) => ({ ...prev, year: e.target.value }))}
                      placeholder="nh???p n??m ph??t h??nh ..."
                      id="year"
                    />
                  </div>
                  <label htmlFor="image" className="form-label">
                    Ch???n ?????a ch??? ???nh
                  </label>
                  <div className="input-group mb-3">
                    <input
                      type="text"
                      placeholder="copy ?????a ch??? ???nh tr??n m???ng v??o ????y"
                      value={movie.img}
                      autoComplete="off"
                      onChange={(e) => setMovie((prev) => ({ ...prev, img: e.target.value }))}
                      className="form-control"
                      id="image"
                    />
                  </div>
                </div>
                <div className="col">
                  <label htmlFor="movieContent" className="form-label">
                    N???i dung phim
                  </label>
                  <div className="input-group mb-3">
                    <textarea
                      type="text"
                      className="form-control"
                      autoComplete="off"
                      value={movie.content}
                      onChange={(e) => setMovie((prev) => ({ ...prev, content: e.target.value }))}
                      placeholder="nh???p n???i dung phim ..."
                      id="movieContent"
                    />
                  </div>
                  <label htmlFor="directorAndWriter" className="form-label">
                    ?????o di???n v?? t??c gi???
                  </label>
                  <div className="input-group mb-3">
                    <input
                      type="text"
                      className="form-control"
                      autoComplete="off"
                      value={movie.directorAndWriter}
                      onChange={(e) =>
                        setMovie((prev) => ({ ...prev, directorAndWriter: [...e.target.value.split(",")] }))
                      }
                      placeholder="nh???p ?????o di???n v?? t??c gi??? ..."
                      id="directorAndWriter"
                    />
                  </div>
                  <label htmlFor="actors" className="form-label">
                    Di???n vi??n
                  </label>
                  <div className="input-group mb-3">
                    <input
                      type="text"
                      className="form-control"
                      autoComplete="off"
                      value={movie.actors}
                      onChange={(e) => setMovie((prev) => ({ ...prev, actors: [...e.target.value.split(",")] }))}
                      placeholder="nh???p di???n vi??n ..."
                      id="actors"
                    />
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                  onClick={clearMovieIdAndForm}
                >
                  ????ng
                </button>
                <button
                  type="submit"
                  disabled={movie.name ? false : true}
                  className="btn btn-primary"
                  data-bs-dismiss="modal"
                >
                  {movieId ? "C???p nh???t" : "Th??m"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
