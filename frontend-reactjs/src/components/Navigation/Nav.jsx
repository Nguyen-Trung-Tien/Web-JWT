import React, { useContext } from "react";
import "./Nav.scss";
import { NavLink, useLocation } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";

const Nav = () => {
  const location = useLocation();
  const { user } = useContext(UserContext);

  if ((user && user.isAuthenticated === true) || location.pathname === "/") {
    return (
      <>
        <div className="topnav">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/user">Manage User</NavLink>
          <NavLink to="/project">Project</NavLink>
          <NavLink to="/about">About</NavLink>
        </div>
      </>
    );
  } else {
    return <></>;
  }
};

export default Nav;
