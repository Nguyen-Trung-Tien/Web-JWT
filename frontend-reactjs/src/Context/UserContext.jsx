import { useState, createContext, useEffect } from "react";
import { handleGetUserAccount } from "../services/userService";
import { useNavigate } from "react-router";

const UserContext = createContext(null);

const UserProvider = ({ children }) => {
  // const navigate = useNavigate();
  const userDefault = {
    isLoading: true,
    isAuthenticated: false,
    token: "",
    account: {},
  };
  const [user, setUser] = useState(userDefault);

  const loginContext = (userData) => {
    setUser({
      ...userData,
      isLoading: false,
    });
  };

  const logoutContext = (userData) => {
    setUser({
      ...userData,
      isLoading: false,
    });
  };

  const fetchUser = async () => {
    try {
      const res = await handleGetUserAccount();
      if (res && res.EC === 0) {
        const { groupWithRoles, email, phoneNumber, username, access_token } =
          res.DT;

        setUser({
          isAuthenticated: true,
          token: access_token,
          account: { groupWithRoles, email, phoneNumber, username },
          isLoading: false,
        });
      } else {
        setUser({ ...userDefault, isLoading: false });
      }
    } catch (error) {
      console.error("fetchUser error:", error);
      setUser({ ...userDefault, isLoading: false });
    }
  };

  useEffect(() => {
    if (
      window.location.pathname !== "/" &&
      window.location.pathname !== "/login"
    ) {
      fetchUser();
    } else {
      setUser({ ...user, isLoading: false });
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, loginContext, logoutContext }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };
