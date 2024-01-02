import React from "react";
import { Outlet, Navigate } from "react-router-dom";

const ProtectedUser = ({ component: Component, ...props }) => {
    const user = window.localStorage.getItem("accessToken")
    // console.log(user)
    return <>{user ? <Outlet /> : <Navigate to="/" />}</>;
};

export default ProtectedUser;