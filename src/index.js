import "bootstrap/dist/js/bootstrap.js";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { lazy } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./pages/errorPage";
import AllMovies from "./components/MoviesContainer/AllMovies";
import LoadingProvider from "./components/Context/LoadingContext";
import MoviesProvider from "./components/Context/MoviesContext";
import MovieIdProvider from "./components/Context/MovieIdContext";

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
