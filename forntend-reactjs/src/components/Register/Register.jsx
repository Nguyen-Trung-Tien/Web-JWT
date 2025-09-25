import React, { useState } from "react";
import "./Register.scss";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState();

  const handleLogin = () => {
    navigate("/login");
  };

  const isValidInput = () => {
    if (!email) {
      toast.error("Email is required!");
      return false;
    }
    if (!phoneNumber) {
      toast.error("Phone number is required!");
      return false;
    }
    if (!userName) {
      toast.error("Username is required!");
      return false;
    }
    if (!password) {
      toast.error("Password is required!");
      return false;
    }
    if (password != confirmPassword) {
      toast.error("Password does not match!");
      return false;
    }
    let validateEmail = /\S+@\S+\.\S+/;
    if (!validateEmail.test(email)) {
      toast.error("Please enter a valid email address!");
      return false;
    }
    return true;
  };

  const handleRegister = () => {
    let checkInput = isValidInput();
    toast.success("Register success!");
    let userData = { email, phoneNumber, userName, password, confirmPassword };
  };

  return (
    <div className="register-container">
      <div className="container">
        <div className="row px-3 px-sm-0">
          <div className="content-left col-12 d-none col-sm-7 d-sm-block">
            <div className="brand">Facebook</div>
            <div className="detail">
              Facebook giúp bạn kết nối và chia sẻ với mọi người trong cuộc sống
              của bạn.
            </div>
          </div>

          <div className="content-right col-sm-5 col-12 d-flex flex-column gap-3 py-3">
            <div className="brand d-sm-none">Facebook</div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="text"
                className="form-control"
                placeholder="Email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Phone number</label>
              <input
                type="text"
                className="form-control"
                placeholder="Phone number"
                value={phoneNumber}
                onChange={(event) => setPhoneNumber(event.target.value)}
              />
            </div>
            <div className="form-group">
              <label>User name</label>
              <input
                type="text"
                className="form-control"
                placeholder="User name"
                value={userName}
                onChange={(event) => setUserName(event.target.value)}
              />
            </div>
            <div className="form-group ">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Confirm password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
              />
            </div>

            <button
              className="btn btn-primary"
              type="submit"
              onClick={() => handleRegister()}
            >
              Register
            </button>

            <hr />
            <div className="text-center">
              <button className="btn btn-success" onClick={() => handleLogin()}>
                Already my account! Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
