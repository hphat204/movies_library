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
        <div className="container-fluid justify-content-center" style={{ height: "100vh" }}>
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 row-cols-lg-5 g-4 pt-3 pb-5">
            <Outlet />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
