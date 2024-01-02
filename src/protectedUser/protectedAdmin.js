import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";

const ProtectedAdmin = ({ component: Component, ...props }) => {
  const accessToken = localStorage.getItem("accessToken");
  const [token, setToken] = useState(false);
  useEffect(() => {
    setToken(jwtDecode(accessToken));
  }, [accessToken]);
  const admin = token.role;
  return (
    <>
      {token && (
        <div>{admin === "admin" ? <Outlet /> : <Navigate to="/" />}</div>
      )}
    </>
  );
};

export default ProtectedAdmin;
