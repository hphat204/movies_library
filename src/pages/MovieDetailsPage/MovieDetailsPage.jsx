import React, { useEffect, useMemo, useState } from "react";
import { useMovies } from "../../components/Context/MoviesContext";
import { Link, useParams, ScrollRestoration } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTicketSimple } from "@fortawesome/free-solid-svg-icons";
import { useMovieDispatch } from "../../components/Context/MoviesContext";
export default function MovieDetailsPage() {
  const { id } = useParams();
  const { movies } = useMovies();
  const dispatch = useMovieDispatch();
  const findMovieById = movies.find((mov) => mov.id === id);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  useEffect(() => {
    setRating(findMovieById.rating || 0);
  }, [findMovieById.rating]);

  const randomMoviesWithSameCategory = useMemo(() => {
    const moviesArr = [];
    const moviesWithSameCategory = movies.filter(
      (mov) => findMovieById.category.some((cate) => mov.category.includes(cate)) && mov.id !== findMovieById.id
    );
    if (moviesWithSameCategory.length === 0) return;
    if (moviesWithSameCategory.length <= 3) return moviesWithSameCategory;
    for (let i = 0; i < 3; i++) {
      let randomNum = Math.floor(Math.random() * moviesWithSameCategory.length);
      moviesArr.push(moviesWithSameCategory[randomNum]);
      moviesWithSameCategory.splice(randomNum, 1);
    }
    return moviesArr;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [findMovieById.id]);
  const ratingComment = useMemo(() => {
    const checkRating = hoverRating || rating;
    if (checkRating === 0) return;
    if (checkRating === 1) return "phim tệ";
    if (checkRating === 2) return "phim chưa cuốn hút";
    if (checkRating === 3) return "phim nên xem";
    if (checkRating === 4) return "phim đáng xem";
    if (checkRating === 5) return "phim hay";
  }, [rating, hoverRating]);

  const addRating = (ratingVal) => {
    dispatch({ type: "SET_MOVIE_RATING", payload: { id: findMovieById.id, rating: ratingVal } });
  };

  return (
    <div
      className="container-fluid pt-2 pb-5 px-0 text-center text-white min-vh-100"
      style={{ backgroundColor: "#141414" }}
    >
      <ScrollRestoration />
      <Link to="/" style={{ textDecoration: "none" }}>
        <button className="d-flex justify-content-start ms-2 btn btn-secondary">trang chủ</button>
      </Link>
      <div className="d-flex justify-content-around ">
        <div className="d-flex flex-column w-25 ">
          <img src={findMovieById.img} alt={findMovieById.name} className="w-75 mx-auto object-fit-cover rounded" />
          <div className="d-flex mx-1 justify-content-center  align-items-center mt-3">
            {[...new Array(5)].map((ticket, index) => {
              const ratingVal = index + 1;
              return (
                <label key={index} role="button" className="mx-1">
                  <input
                    type="radio"
                    value={ratingVal}
                    onClick={() => addRating(ratingVal)}
                    style={{ display: "none" }}
                  />
                  <FontAwesomeIcon
                    icon={faTicketSimple}
                    color={ratingVal <= (hoverRating || rating) ? "#c53126" : "#e7e7e7"}
                    fontSize={25}
                    onMouseEnter={() => setHoverRating(ratingVal)}
                    onMouseLeave={() => setHoverRating(0)}
                  />
                </label>
              );
            })}
          </div>
          <p className=" text-capitalize fw-bold text-danger text-center">{ratingComment}</p>
        </div>
      </div>
      <div className="w-50 mx-auto">
        <h1 className="text-capitalize">{findMovieById.name}</h1>
        <h2 className="fs-3">{findMovieById.year}</h2>
        {findMovieById.category.map((cate, index) => (
          <p key={index} className="badge text-bg-dark me-2 p-2">
            {cate}
          </p>
        ))}
        {findMovieById.content && (
          <p>
            <strong>Nội dung:</strong> {findMovieById.content}
          </p>
        )}
        {findMovieById.directorAndWriter.length > 0 && (
          <p>
            <strong> Đạo diễn:</strong> {findMovieById.directorAndWriter}
          </p>
        )}
        {findMovieById.actors.length > 0 && (
          <p>
            <strong>Diễn viên:</strong> {findMovieById.actors.join(",")}.
          </p>
        )}
        {randomMoviesWithSameCategory && (
          <>
            <h5 className="text-danger fw-bold pt-3">Phim có cùng Thể loại </h5>
            <div className="d-flex flex-wrap w-100 justify-content-evenly pt-2">
              {randomMoviesWithSameCategory &&
                randomMoviesWithSameCategory.map((mov, index) => (
                  <div key={index} className="w-25" role="button">
                    <Link to={`/movie/${mov.id}`} style={{ textDecoration: "none" }}>
                      {mov.img ? (
                        <img src={mov.img} alt={mov.name} className="w-100 rounded img-hover" />
                      ) : (
                        <h1 className="text-black text-capitalize">{mov.name}</h1>
                      )}
                    </Link>
                  </div>
                ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
