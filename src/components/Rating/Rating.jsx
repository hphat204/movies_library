import React, { useState, useEffect } from "react";
import { useMovieDispatch } from "../../components/Context/MoviesContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTicketSimple } from "@fortawesome/free-solid-svg-icons";

export default function Rating({ movieId, findMovieById, movieCard }) {
  const dispatch = useMovieDispatch();
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  useEffect(() => {
    setRating(findMovieById.rating || 0);
  }, [findMovieById.rating]);

  function ratingComment() {
    const checkRating = hoverRating || rating;
    if (checkRating === 0) return;
    if (checkRating === 1) return "phim tệ";
    if (checkRating === 2) return "phim chưa cuốn hút";
    if (checkRating === 3) return "phim nên xem";
    if (checkRating === 4) return "phim đáng xem";
    if (checkRating === 5) return "phim hay";
  }
  const addRating = (ratingVal) => {
    dispatch({ type: "SET_MOVIE_RATING", payload: { id: movieId, rating: ratingVal } });
  };
  if (movieCard) {
    return (
      <div
        className="position-absolute bottom-0 card-rating pt-2 w-100 text-center"
        style={{ backgroundColor: "rgba(231,233,235,0.5)" }}
      >
        {[...new Array(5)].map((ticket, index) => {
          const ratingVal = index + 1;
          return (
            <label key={index} role="button" className="mx-1">
              <input type="radio" value={ratingVal} style={{ display: "none" }} />
              <FontAwesomeIcon
                icon={faTicketSimple}
                color={ratingVal <= rating ? "#c53126" : "rgba(231,233,235,0.7)"}
                fontSize={21}
              />
            </label>
          );
        })}
      </div>
    );
  }
  return (
    <>
      <div className="mt-3">
        {[...new Array(5)].map((ticket, index) => {
          const ratingVal = index + 1;
          return (
            <label key={index} role="button" className="mx-1">
              <input type="radio" value={ratingVal} onClick={() => addRating(ratingVal)} style={{ display: "none" }} />
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
      <p className=" text-capitalize fw-bold text-danger text-center my-2">
        {ratingComment() || "phim chưa được đánh giá"}
      </p>
    </>
  );
}
