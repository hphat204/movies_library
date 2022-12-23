import { useRouteError } from "react-router-dom";
export default function ErrorPage() {
  const error = useRouteError();
  console.log(error);
  return (
    <div className="text-center mt-5" id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i className="text-danger">{error.statusText || error.message}</i>
      </p>
    </div>
  );
}
