import React, { useEffect, useState } from "react";
import "./Register.scss";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const defaultValidInput = {
    isValidEmail: true,
    isValidPhoneNumber: true,
    isValidPassword: true,
    isValidConfirmPassword: true,
  };
  const [objCheckInput, setObjCheckInput] = useState(defaultValidInput);

  const handleLogin = () => {
    navigate("/login");
  };

  const isValidInput = () => {
    setObjCheckInput(defaultValidInput);

    if (!email) {
      toast.error("Email is required!");
      setObjCheckInput({ ...defaultValidInput, isValidEmail: false });
      return false;
    }
    let validateEmail = /\S+@\S+\.\S+/;
    if (!validateEmail.test(email)) {
      setObjCheckInput({ ...defaultValidInput, isValidEmail: false });
      toast.error("Please enter a valid email address!");
      return false;
    }

    if (!phoneNumber) {
      setObjCheckInput({ ...defaultValidInput, isValidPhoneNumber: false });
      toast.error("Phone number is required!");
      return false;
    }
    if (!username) {
      toast.error("username is required!");
      return false;
    }
    if (!password) {
      setObjCheckInput({ ...defaultValidInput, isValidPassword: false });
      toast.error("Password is required!");
      return false;
    }
    if (password != confirmPassword) {
      setObjCheckInput({ ...defaultValidInput, isValidConfirmPassword: false });
      toast.error("Password does not match!");
      return false;
    }

    return true;
  };

  const handleRegister = () => {
    let checkInput = isValidInput();
    if (checkInput === true) {
      axios.post("http://localhost:8080/api/v1/register", {
        email,
        phoneNumber,
        username,
        password,
        confirmPassword,
      });
    }
    // toast.success("Register success!");
    let userData = { email, phoneNumber, username, password, confirmPassword };
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
                className={
                  objCheckInput.isValidEmail
                    ? "form-control"
                    : "form-control is-invalid"
                }
                placeholder="Email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Phone number</label>
              <input
                type="text"
                className={
                  objCheckInput.isValidPhoneNumber
                    ? "form-control"
                    : "form-control is-invalid"
                }
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
                value={username}
                onChange={(event) => setUsername(event.target.value)}
              />
            </div>
            <div className="form-group ">
              <label>Password</label>
              <input
                type="password"
                className={
                  objCheckInput.isValidPassword
                    ? "form-control"
                    : "form-control is-invalid"
                }
                placeholder="Password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Confirm password</label>
              <input
                type="password"
                className={
                  objCheckInput.isValidConfirmPassword
                    ? "form-control"
                    : "form-control is-invalid"
                }
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
