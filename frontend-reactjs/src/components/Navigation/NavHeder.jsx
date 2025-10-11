import React, { useContext } from "react";
import "./NavHeder.scss";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { handleLogoutUser } from "../../services/userService";
import { toast } from "react-toastify";

const NavHeder = () => {
  const location = useLocation();
  const { user, logoutContext } = useContext(UserContext);
  const navigate = useNavigate();
  const handleLogout = async () => {
    let data = await handleLogoutUser();
    if (data && data.EC === 0) {
      localStorage.removeItem("jwt");
      logoutContext();
      navigate("/login");
      toast.success("Logout success!");
    } else {
      toast.error("Logout error!");
    }
  };
  if ((user && user.isAuthenticated === true) || location.pathname === "/") {
    return (
      <>
        <div className="nav-header">
          <Navbar expand="lg" className="bg-header">
            <Container>
              <Navbar.Brand href="#home">
                <img
                  src="assets/vite.svg"
                  width="30"
                  height="30"
                  className="d-inline-block align-top"
                  alt="React Bootstrap logo"
                />
                <span className="brand-name"> React Vite</span>
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                  <NavLink to="/" className="nav-link">
                    Home
                  </NavLink>
                  <NavLink to="/user" className="nav-link">
                    Manage User
                  </NavLink>
                  <NavLink to="/project" className="nav-link">
                    Project
                  </NavLink>
                  <NavLink to="/roles" className="nav-link">
                    Roles
                  </NavLink>
                  <NavLink to="/about" className="nav-link">
                    About
                  </NavLink>
                </Nav>
                <Nav>
                  {user && user.isAuthenticated === true ? (
                    <>
                      <Nav.Item className="nav-link">
                        Welcome {user.account.username}!
                      </Nav.Item>

                      <NavDropdown title="Setting">
                        <NavDropdown.Item>Change password</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item>
                          <span onClick={() => handleLogout()}>Logout</span>
                        </NavDropdown.Item>
                      </NavDropdown>
                    </>
                  ) : (
                    <>
                      <Link className="nav-link" to="/login">
                        Login
                      </Link>
                    </>
                  )}
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </div>
      </>
    );
  } else {
    return <></>;
  }
};

export default NavHeder;
