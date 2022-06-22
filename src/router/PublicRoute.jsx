import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import {
  ADMIN_PRODUCTS,
  FORGOT_PASSWORD,
  SIGNIN,
  SIGNUP,
} from "../constants/routes";
import { useSelector } from "react-redux";

const PublicRoute = ({ isAuth, role, element: Component, ...rest }) => {
  const path = useLocation();
  const profile = useSelector((state) => state.profile);
  console.log("pro", profile.role === "USER", path.pathname === SIGNIN);

  if (profile.role === "ADMIN") {
    return <Navigate to={ADMIN_PRODUCTS} replace={true} />;
  } else if (
    profile.role === "USER" &&
    (path.pathname === SIGNIN ||
      path.pathname === SIGNUP ||
      path.pathname === FORGOT_PASSWORD)
  ) {
    return <Navigate to={"/"} replace={true} />;
  } else {
    return <Outlet />;
  }
};

export default PublicRoute;
