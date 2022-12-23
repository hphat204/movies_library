import React, { useState } from "react";
import FormModal from "../FormModal/FormModal";
import { useMovieId } from "../Context/MovieIdContext";
import { useMovieDispatch } from "../Context/MoviesContext";
import { useHref } from "react-router-dom";
import { useMovies } from "../Context/MoviesContext";
import noImg from "../../image/no-image.png";
import moment from "moment/moment";
import "moment/locale/vi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus, faPenToSquare, faTrash, faEllipsisH } from "@fortawesome/free-solid-svg-icons";

moment.locale("vi");
export default function Movies({ movie }) {
  const { setMovieId } = useMovieId();
  const dispatch = useMovieDispatch();
  const getMovieListFromURL = useHref().slice(1);
  const { movies } = useMovies();
  const [openChoice, setOpenChoice] = useState(false);

  function handleAdd(movieList) {
    const foundMovie = movies.find((mov) => mov.id === movie.id);
    dispatch({ type: "ADD_MOVIE", payload: { foundMovie: foundMovie, list: movieList } });
  }
  function handleDelete(movieId) {
    dispatch({ type: "DELETE_MOVIE", payload: { id: movieId, list: getMovieListFromURL } });
  }
  return (
    <div className="card border border-0 ">
      <FormModal />
      <img src={movie.img || noImg} alt={movie.name} className="rounded img-fluid" />
      <div className="card-img-top">
        {movie.name.length > 15 ? (
          <>
            <div className="card-title ms-2 fs-5 mt-2 fw-bold text-capitalize text-danger mb-0">
              {movie.name.slice(0, 18)}
            </div>
            <div className="card-title ms-2  fs-5 mt-0 fw-bold text-capitalize mb-0">{movie.name.slice(18, 33)}</div>
            <div className="card-title ms-2 fs-5 mt-0 fw-bold text-capitalize mb-0">{movie.name.slice(33)}</div>
          </>
        ) : (
          <div className="card-title ms-2 mt-2 fs-5 fw-bold text-capitalize text-danger mb-0">{movie.name}</div>
        )}

        {movie.year && <p className="fw-bold ms-2 fst-italic text-primary">({String(movie.year)})</p>}
        {movie.category && <p className="ms-1 text-capitalize mb-0">Thể loại: {movie.category}</p>}
        <p className="text-end fst-italic fw-light" style={{ fontSize: "0.8rem" }}>
          đã thêm {moment.utc(movie.date).fromNow()}
        </p>
      </div>
      <button
        className="btn ms-auto btn-secondary mb-1"
        style={{ width: "50px" }}
        onClick={() => setOpenChoice((prev) => !prev)}
      >
        <FontAwesomeIcon icon={faEllipsisH} />
      </button>
      {openChoice && (
        <div className="btn-group">
          <div className="btn-group">
            <button type="button" className="btn btn-primary" data-bs-toggle="dropdown" aria-expanded="false">
              <FontAwesomeIcon icon={faCirclePlus} />
            </button>
            <ul className="dropdown-menu">
              <li>
                <button className="dropdown-item" onClick={() => handleAdd("watchedMovies")}>
                  Đã xem
                </button>
              </li>
              <li>
                <button className="dropdown-item" onClick={() => handleAdd("savedMovies")}>
                  Xem sau
                </button>
              </li>
              <li>
                <button className="dropdown-item" onClick={() => handleAdd("likedMovies")}>
                  yêu thích
                </button>
              </li>
            </ul>
          </div>
          <button
            className="btn btn-dark img-overlay"
            onClick={(e) => {
              e.preventDefault();
              setMovieId(movie.id);
            }}
            data-bs-toggle="modal"
            data-bs-target="#Modal"
          >
            <FontAwesomeIcon icon={faPenToSquare} />
          </button>
          <button className="btn btn-danger img-overlay" onClick={() => handleDelete(movie.id)}>
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
      )}
    </div>
  );
}
