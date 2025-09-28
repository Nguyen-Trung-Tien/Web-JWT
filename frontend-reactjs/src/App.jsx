import { Routes, Route } from "react-router";
import "./App.scss";
import Nav from "./components/Navigation/Nav";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import { ToastContainer } from "react-toastify";
import User from "./components/ManageUsers/User";
import { useEffect, useState } from "react";
import _ from "lodash";

function App() {
  // const location = useLocation();
  // const hideNavPaths = ["/login", "/register"];
  // const shouldHideNav = hideNavPaths.includes(location.pathname);
  const [account, setAccount] = useState({});

  useEffect(() => {
    let session = sessionStorage.getItem("account");
    if (session) {
      setAccount(JSON.parse(session));
    }
  }, []);
  return (
    <div className="app-container">
      {/* {!shouldHideNav && <Nav />} */}
      {account && !_.isElement(account) && account.isAuthenticated && <Nav />}

      <Routes>
        <Route path="/" element={<div>Đây là trang Home</div>} />
        <Route path="/news" element={<div>Đây là trang News</div>} />
        <Route path="/contact" element={<div>Đây là trang Contact</div>} />
        <Route path="/about" element={<div>Đây là trang About</div>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/user" element={<User />} />
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
