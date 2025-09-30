import "./App.scss";
import { ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";
import AppRoutes from "./routes/AppRoutes";
import Nav from "./components/Navigation/Nav";

function App() {
  const [account, setAccount] = useState(null);

  useEffect(() => {
    const session = sessionStorage.getItem("account");
    if (session) {
      setAccount(JSON.parse(session));
    }
  }, []);

  return (
    <>
      <div className="app-header">
        <Nav account={account} />
      </div>
      <div className="app-container">
        <AppRoutes account={account} />
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
