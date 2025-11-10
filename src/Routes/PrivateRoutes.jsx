import React, { use } from "react";
import { AuthContext } from "../contexts/AuthContext/AuthContext";
import { Navigate, useLocation } from "react-router";

const PrivateRoutes = ({ children }) => {
  const { user, loading } = use(AuthContext);
  const location = useLocation();

  if (loading) {
    return <span className="loading loading-spinner text-success"></span>;
  }
  if (user) {
    return children;
  }
  return (
    <div>
      <Navigate state={location?.pathname} to="/login"></Navigate>
    </div>
  );
};

export default PrivateRoutes;
