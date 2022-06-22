import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminRoute = ({ isAuth, role, component: Component, ...rest }) => {
  const profile = useSelector((state) => state.profile);

  return profile.role === "ADMIN" ? (
    <Outlet />
  ) : (
    <Navigate to="/" replace={true} />
  );
};

export default AdminRoute;
