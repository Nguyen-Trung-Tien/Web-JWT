import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { UserContext } from "../Context/UserContext";
import { useContext } from "react";

const PrivateRoutes = () => {
  const { user } = useContext(UserContext);
  console.log(user);

  const session = sessionStorage.getItem("account");
  if (!session) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default PrivateRoutes;
