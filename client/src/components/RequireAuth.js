import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth = () => {
  const { currentUser } = useAuth();

  return currentUser?.id ? <Outlet /> : <Navigate to="/login" />;
};

export default RequireAuth;
