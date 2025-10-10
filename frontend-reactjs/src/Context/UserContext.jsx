import { useState, createContext } from "react";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const session = sessionStorage.getItem("account");
    return session
      ? JSON.parse(session)
      : {
          isAuthenticated: false,
          token: "",
          account: {},
        };
  });

  const loginContext = (userData) => {
    setUser(userData);
    sessionStorage.setItem("account", JSON.stringify(userData));
  };

  const logout = () => {
    setUser({
      isAuthenticated: false,
      token: "",
      account: {},
    });
    sessionStorage.removeItem("account");
  };

  return (
    <UserContext.Provider value={{ user, loginContext, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };
