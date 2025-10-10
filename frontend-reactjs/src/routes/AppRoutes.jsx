import { Routes, Route } from "react-router-dom";
import Login from "../components/Login/Login";
import Register from "../components/Register/Register";
import PrivateRoutes from "./PrivateRoutes";
import User from "../components/ManageUsers/User";
import Project from "../components/ManageProject/Project";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route element={<PrivateRoutes />}>
        <Route path="/" element={<div>Đây là trang Home</div>} />
        <Route path="/user" element={<User />} />
        <Route path="/project" element={<Project />} />
      </Route>
      <Route path="*" element={<div>404 not found!</div>} />
    </Routes>
  );
};

export default AppRoutes;
