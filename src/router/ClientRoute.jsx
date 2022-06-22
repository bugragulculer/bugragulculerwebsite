import { ADMIN, SIGNIN } from "../constants/routes";
import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = ({ isAuth, role, component: Component, ...rest }) => {
  const profile = useSelector((state) => state.profile);
  if (profile.role === "USER") {
    return <Outlet />;
  }

  if (profile.role === "ADMIN") {
    return <Navigate to={ADMIN} replace={true} />;
  }

  return (
    <Navigate
      to={{
        pathname: SIGNIN,
      }}
      replace={true}
    />
  );
};

export default PrivateRoute;
