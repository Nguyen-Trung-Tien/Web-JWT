import { Routes, Route } from "react-router";
import "./App.scss";
import Nav from "./components/Navigation/Nav";
import Login from "./components/Login/Login";

function App() {
  return (
    <div className="app-container">
      <Nav />
      <Routes>
        <Route path="/" element={<div>Đây là trang Home</div>} />
        <Route path="/news" element={<div> Đây là trang News</div>} />
        <Route path="/contact" element={<div> Đây là trang Contact</div>} />
        <Route path="/about" element={<div>ℹĐây là trang About</div>} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
