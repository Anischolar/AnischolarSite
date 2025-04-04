// components/ProtectedLayout.tsx
import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "./authProvider";

const ProtectedLayout: React.FC = () => {
  const { isLoggedIn } = useAuth();

  return isLoggedIn ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedLayout;
