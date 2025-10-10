import { useState, createContext } from "react";
import { handleGetUserAccount } from "../services/userService";
import { useEffect } from "react";

const UserContext = createContext(null);

const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    isAuthenticated: false,
    token: "",
    account: {},
  });

  const loginContext = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser({
      isAuthenticated: false,
      token: "",
      account: {},
    });
  };

  const fetchUser = async () => {
    let res = await handleGetUserAccount();
    if (res && res.EC === 0) {
      let groupWithRoles = res.DT.groupWithRoles;
      let email = res.DT.email;
      let phoneNumber = res.DT.phoneNumber;
      let username = res.DT.username;
      let token = res.DT.access_token;

      let data = {
        isAuthenticated: true,
        token,
        account: { groupWithRoles, email, phoneNumber, username },
      };
      setUser(data);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <UserContext.Provider value={{ user, loginContext, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };
