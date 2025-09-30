import React, { useEffect, useState } from "react";
import "./Nav.scss";
import { NavLink, useLocation } from "react-router";

const Nav = () => {
  const [isShow, setIsShow] = useState(true);
  const location = useLocation();
  useEffect(() => {
    if (location.pathname === "/login") {
      setIsShow(false);
    }
  }, []);
  return (
    <>
      {isShow === true && (
        <div className="topnav">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/user">Manage User</NavLink>
          <NavLink to="/project">Project</NavLink>
          <NavLink to="/about">About</NavLink>
        </div>
      )}
    </>
  );
};

export default Nav;
