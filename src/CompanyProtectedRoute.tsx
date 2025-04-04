// components/CompanyProtectedLayout.tsx
import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "./authProvider";

const CompanyProtectedLayout: React.FC = () => {
  const { companyData } = useAuth();

  return companyData && Object.keys(companyData).length > 0 ? (
    <Outlet />
  ) : (
    <Navigate to="/industry/signin" replace />
  );
};

export default CompanyProtectedLayout;
