import { Routes, Route } from "react-router-dom";
import Login from "../components/Login/Login";
import Register from "../components/Register/Register";
import PrivateRoutes from "./PrivateRoutes";
import User from "../components/ManageUsers/User";
import Project from "../components/ManageProject/Project";
import Roles from "../components/Roles/Roles";
import GroupRole from "../components/GroupRole/GroupRole";
import HomePage from "../components/HomePage/HomePage";
import About from "../components/About/About";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<About />} />
      <Route element={<PrivateRoutes />}>
        <Route path="/user" element={<User />} />
        <Route path="/project" element={<Project />} />
        <Route path="/roles" element={<Roles />} />
        <Route path="/group-role" element={<GroupRole />} />
      </Route>
      <Route path="*" element={<div>404 not found!</div>} />
    </Routes>
  );
};

export default AppRoutes;
