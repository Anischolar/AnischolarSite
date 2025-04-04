// components/ProtectedLayout.tsx
// import React from "react";
// import { Outlet, Navigate } from "react-router-dom";
// import { useAuth } from "./authProvider";

// const ProtectedLayout: React.FC = () => {
//   const { isLoggedIn } = useAuth();

//   return isLoggedIn ? <Outlet /> : <Navigate to="/login" replace />;
// };

// export default ProtectedLayout;


import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "./fireAuthProvider";

const ProtectedLayout: React.FC = () => {
  const { isLoggedIn, initializing } = useAuth();

  if (initializing) return <div>Loading...</div>;

  return isLoggedIn ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedLayout;
