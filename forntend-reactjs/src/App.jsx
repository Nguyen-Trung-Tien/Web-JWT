import { Routes, Route, useLocation } from "react-router";
import "./App.scss";
import Nav from "./components/Navigation/Nav";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import { ToastContainer } from "react-toastify";

function App() {
  const location = useLocation();

  const hideNavPaths = ["/login", "/register"];
  const shouldHideNav = hideNavPaths.includes(location.pathname);

  return (
    <div className="app-container">
      {!shouldHideNav && <Nav />}

      <Routes>
        <Route path="/" element={<div>Đây là trang Home</div>} />
        <Route path="/news" element={<div>Đây là trang News</div>} />
        <Route path="/contact" element={<div>Đây là trang Contact</div>} />
        <Route path="/about" element={<div>Đây là trang About</div>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<div>404 not found!</div>} />
      </Routes>
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
    </div>
  );
}
export default App;
