import { useContext, useEffect, useState } from "react";
import "./Login.scss";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { handleLoginUser } from "../../services/userService";
import { UserContext } from "../../Context/UserContext";

const Login = () => {
  const { user, loginContext } = useContext(UserContext);
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
    try {
      const res = await handleLoginUser(valueLogin, password);

      if (res && res.EC === 0) {
        const {
          DT: { groupWithRoles, email, phoneNumber, username, access_token },
          EM,
        } = res;

        const userData = {
          isAuthenticated: true,
          token: access_token,
          account: { groupWithRoles, email, phoneNumber, username },
        };

        localStorage.setItem("jwt", access_token);
        loginContext(userData);
        navigate("/user");
        toast.success(EM);
      } else {
        toast.error("User not found!");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.warning("User not found!");
    }
  };

  const handlePressEnter = (event) => {
    if (event.charCode === 13 && event.code === "Enter") {
      handleLogin();
    }
  };

  useEffect(() => {
    if (user && user.isAuthenticated) {
      navigate("/");
    }
  }, []);

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
              onKeyPress={(event) => handlePressEnter(event)}
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
              <div className="mt-3 return">
                <Link to="/">
                  <i className="fa-solid fa-arrow-left"></i>
                  <span className="title">Return to HomePage</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
