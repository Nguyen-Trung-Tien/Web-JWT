import React, { useState } from "react";
import "./Login.scss";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { handleLoginUser } from "../../services/userService";

const Login = () => {
  const navigate = useNavigate();
  const [valueLogin, setValueLogin] = useState("");
  const [password, setPassword] = useState("");
  const defaultOjbInput = {
    isValidLogin: true,
    isValidPassword: true,
  };
  const [objCheckValidInput, setObjCheckValidInput] = useState(defaultOjbInput);

  const handlerNewAccount = () => {
    navigate("/register");
  };

  const handleLogin = async () => {
    setObjCheckValidInput(defaultOjbInput);
    if (!valueLogin) {
      setObjCheckValidInput({ ...defaultOjbInput, isValidLogin: false });
      toast.error("Please enter your email or phone number!");
      return;
    }
    if (!password) {
      setObjCheckValidInput({ ...defaultOjbInput, isValidPassword: false });
      toast.error("Please enter your password!");
      return;
    }

    await handleLoginUser(valueLogin, password);
  };

  return (
    <div className="login-container">
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
            <input
              type="text"
              className={
                objCheckValidInput.isValidLogin
                  ? "form-control"
                  : " is-invalid form-control"
              }
              placeholder="Email or phone number"
              value={valueLogin}
              onChange={(event) => {
                setValueLogin(event.target.value);
              }}
            />
            <input
              type="password"
              className={
                objCheckValidInput.isValidPassword
                  ? "form-control"
                  : " is-invalid form-control"
              }
              placeholder="Password"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />

            <button className="btn btn-primary" onClick={() => handleLogin()}>
              Login
            </button>
            <span className="text-center">
              <a className="forgot-password" href="#">
                Forgot your password?
              </a>
            </span>
            <hr />
            <div className="text-center">
              <button
                className="btn btn-success"
                onClick={() => handlerNewAccount()}
              >
                Create new account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
