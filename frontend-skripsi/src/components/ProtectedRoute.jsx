import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/admin/dashboard" />;
  }

  return children; // Jika sudah login, tampilkan komponen yang diproteksi
};

export default ProtectedRoute;