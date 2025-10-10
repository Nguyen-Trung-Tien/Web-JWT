import "./App.scss";
import { ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";
import AppRoutes from "./routes/AppRoutes";
import Nav from "./components/Navigation/Nav";

function App() {
  return (
    <>
      <div className="app-header">
        <Nav />
      </div>
      <div className="app-container">
        <AppRoutes />
      </div>
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
