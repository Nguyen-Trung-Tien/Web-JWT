import { Navigate, Outlet } from "react-router-dom";
import { UserContext } from "../Context/UserContext";
import { useContext } from "react";

const PrivateRoutes = () => {
  const { user } = useContext(UserContext);

  if (user && user.isAuthenticated === true) {
    return (
      <>
        <Outlet />;
      </>
    );
  } else {
    return <Navigate to="/login" replace />;
  }
};

export default PrivateRoutes;
