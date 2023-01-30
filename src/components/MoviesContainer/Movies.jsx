import React, { useEffect, useRef, useState } from "react";
import FormModal from "../FormModal/FormModal";
import { useMovieId } from "../../Context/MovieIdContext";
import { useMovieDispatch } from "../../Context/MoviesContext";
import { useHref } from "react-router-dom";
import { useMovies } from "../../Context/MoviesContext";
import noImg from "../../image/no-image.png";
import moment from "moment/moment";
import "moment/locale/vi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faPen, faTrash, faEllipsisH, faEyeSlash, faClock, faHeart } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Rating from "../Rating/Rating";

moment.locale("vi");
export default function Movies({ movie }) {
  const { setMovieId } = useMovieId();
  const dispatch = useMovieDispatch();
  const getMovieListFromURL = useHref().slice(1);
  const { movies } = useMovies();
  const [openChoice, setOpenChoice] = useState(false);
  const optionRef = useRef();

  useEffect(() => {
    const closeChoice = (e) => {
      if (!optionRef.current.contains(e.target)) {
        setOpenChoice(false);
      }
    };
    document.addEventListener("mousedown", closeChoice);

    return () => document.removeEventListener("mousedown", closeChoice);
  }, []);

  function handleAdd(movieList) {
    setOpenChoice(false);
    const foundMovie = movies.find((mov) => mov.id === movie.id);
    dispatch({ type: "ADD_MOVIE", payload: { foundMovie: foundMovie, list: movieList } });
  }
  function handleDelete(movieId) {
    setOpenChoice(false);
    dispatch({ type: "DELETE_MOVIE", payload: { id: movieId, list: getMovieListFromURL } });
  }
  return (
    <div className="card border border-0">
      <FormModal />
      <Link to={`/movie/${movie.id}`} style={{ textDecoration: "none", color: "black" }}>
        <div className="overflow-hidden bg-primary position-relative">
          <img src={movie.img || noImg} alt={movie.name} className="rounded img-fluid card-img" />
          <Rating movieId={movie.id} findMovieById={movie} movieCard={true} />
        </div>

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

          {movie.year && <p className="fw-bold ms-2 fst-italic text-secondary mb-2">({String(movie.year)})</p>}
          {movie.category && (
            <p className="ms-1 text-capitalize mb-0">
              {movie.category.map((cate, index) => (
                <span key={index} className="badge text-bg-danger rounded-pill ms-1">
                  {cate}
                </span>
              ))}
            </p>
          )}
          <p className="text-end fst-italic fw-light mt-2" style={{ fontSize: "0.8rem" }}>
            đã thêm {moment.utc(movie.date).fromNow()}
          </p>
        </div>
      </Link>
      {openChoice ? (
        <div className="btn-group" ref={optionRef}>
          <div className="btn-group dropdown w-50 ">
            <button type="button" className="btn btn-primary" data-bs-toggle="dropdown" aria-expanded="false">
              <FontAwesomeIcon icon={faPlus} fontSize={20} />
            </button>
            <ul className="dropdown-menu">
              <li>
                <button className="dropdown-item" onClick={() => handleAdd("watchedMovies")}>
                  <FontAwesomeIcon icon={faEyeSlash} /> Đã xem
                </button>
              </li>
              <li>
                <button className="dropdown-item" onClick={() => handleAdd("savedMovies")}>
                  <FontAwesomeIcon icon={faClock} /> Xem sau
                </button>
              </li>
              <li>
                <button className="dropdown-item" onClick={() => handleAdd("likedMovies")}>
                  <FontAwesomeIcon icon={faHeart} /> Yêu thích
                </button>
              </li>
            </ul>
          </div>
          <button
            className="btn btn-dark w-25"
            onClick={(e) => {
              e.preventDefault();
              setMovieId(movie.id);
              setOpenChoice(false);
            }}
            data-bs-toggle="modal"
            data-bs-target="#Modal"
          >
            <FontAwesomeIcon icon={faPen} />
          </button>
          <button className="btn btn-danger w-25" onClick={() => handleDelete(movie.id)}>
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
      ) : (
        <button className="btn me-auto btn-secondary " ref={optionRef} onClick={() => setOpenChoice(true)}>
          <FontAwesomeIcon icon={faEllipsisH} />
        </button>
      )}
    </div>
  );
}
