import { useState, createContext, useEffect } from "react";
import { handleGetUserAccount } from "../services/userService";

const UserContext = createContext(null);

const UserProvider = ({ children }) => {
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

  const logout = () => {
    setUser({
      isLoading: false,
      isAuthenticated: false,
      token: "",
      account: {},
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
      setUser({
        isAuthenticated: false,
        token: "",
        account: {},
        isLoading: false,
      });
    }
  };

  useEffect(() => {
    if (
      window.location.pathname !== "/" ||
      window.location.pathname !== "/login"
    ) {
      fetchUser();
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, loginContext, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };
