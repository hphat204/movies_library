import React, { useMemo } from "react";
import { useMovies } from "../../components/Context/MoviesContext";
import { Link, useParams, ScrollRestoration } from "react-router-dom";
import Rating from "../../components/Rating/Rating";
export default function MovieDetailsPage() {
  const { id } = useParams();
  const { movies } = useMovies();
  const findMovieById = movies.find((mov) => mov.id === id);

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
          <Rating movieId={id} findMovieById={findMovieById} movieCard={false} />
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
