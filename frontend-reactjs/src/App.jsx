import "./App.scss";
import { useContext } from "react";
import { PulseLoader } from "react-spinners";
import { ToastContainer } from "react-toastify";
import AppRoutes from "./routes/AppRoutes";
import Nav from "./components/Navigation/Nav";
import { UserContext } from "./Context/UserContext";

const override = {
  display: "block",
  margin: "0 auto",
};

function App() {
  const { user } = useContext(UserContext);

  return (
    <>
      {user?.isLoading ? (
        <div className="loading-container" style={{ marginTop: "200px" }}>
          <div>
            <PulseLoader
              color={"#39dbc7"}
              loading={true}
              cssOverride={override}
              height={30}
              width={10}
              aria-label="Loading Spinner"
            />
            <div>Loading ...</div>
          </div>
        </div>
      ) : (
        <>
          <div className="app-header">
            <Nav />
          </div>
          <div className="app-container">
            <AppRoutes />
          </div>
        </>
      )}

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
