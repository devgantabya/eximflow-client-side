import React, { use } from "react";
import { AuthContext } from "../contexts/AuthContext/AuthContext";
import { Navigate, useLocation } from "react-router";
import Loader from "./../Components/Loader/Loader";

const PrivateRoutes = ({ children }) => {
  const { user, loading } = use(AuthContext);
  const location = useLocation();

  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <Loader></Loader>
      </div>
    );
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
