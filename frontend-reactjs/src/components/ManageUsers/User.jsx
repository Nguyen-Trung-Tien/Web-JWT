import React, { useEffect } from "react";
import { useNavigate } from "react-router";

const User = () => {
  const navigate = useNavigate();

  // useEffect(() => {
  //   let session = sessionStorage.getItem("account");
  //   if (!session) {
  //     navigate("/login");
  //   }
  // }, []);
  return <div>User</div>;
};

export default User;
