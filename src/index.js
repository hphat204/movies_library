import "bootstrap/dist/js/bootstrap.js";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { lazy } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./pages/errorPage";
import AllMovies from "./components/MoviesContainer/AllMovies";
import LoadingProvider from "./Context/LoadingContext";
import MoviesProvider from "./Context/MoviesContext";
import MovieIdProvider from "./Context/MovieIdContext";
import MovieDetailsPage from "./pages/MovieDetailsPage/MovieDetailsPage";

const SavedMovies = lazy(() => import("./components/SavedMovies/SavedMovies"));
const LikedMovies = lazy(() => import("./components/LikedMovies/LikedMovies"));
const WatchedMovies = lazy(() => import("./components/WatchedMovies/WatchedMovies"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <AllMovies />,
      },
      {
        path: "/watchedMovies",
        index: true,
        element: <WatchedMovies />,
      },
      {
        path: "/savedMovies",
        element: <SavedMovies />,
      },
      {
        path: "/likedMovies",
        element: <LikedMovies />,
      },
    ],
  },
  {
    path: "/movie/:id",
    errorElement: <ErrorPage />,
    element: <MovieDetailsPage />,
  },
]);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <MoviesProvider>
      <MovieIdProvider>
        <LoadingProvider>
          <RouterProvider router={router} />
        </LoadingProvider>
      </MovieIdProvider>
    </MoviesProvider>
  </React.StrictMode>
);
