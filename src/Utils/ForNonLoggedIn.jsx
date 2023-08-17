import React from "react";
import { Navigate } from "react-router-dom";

const ForNonLoggedIn = ({ loggedIn, children }) => {
  if (loggedIn) {
    return <Navigate to="/" />;
  }
  return children;
};

export default ForNonLoggedIn;
