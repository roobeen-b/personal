/* eslint-disable react/prop-types */

import { Fragment } from "react";
import { Navigate, useLocation } from "react-router-dom";

const CheckAuth = ({ children, authenticated }) => {
  const location = useLocation();

  if (
    !authenticated &&
    !location.pathname.includes("login") &&
    !location.pathname.includes("register")
  ) {
    return <Navigate to="/login" />;
  }

  if (
    authenticated &&
    (location.pathname.includes("login") ||
      location.pathname.includes("register"))
  ) {
    return <Navigate to="/dashboard" />;
  }

  return <Fragment>{children}</Fragment>;
};

export default CheckAuth;
