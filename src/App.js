import NavBar from "./components/NavBar/NavBar";
import { Outlet } from "react-router-dom";
import { useLoading } from "./components/Context/LoadingContext";

function App() {
  const { loading } = useLoading();

  return (
    <div className="container-fluid">
      <NavBar />
      {loading ? (
        <div className="container d-flex justify-content-center align-items-center mt-5">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <Outlet />
      )}
    </div>
  );
}

export default App;
