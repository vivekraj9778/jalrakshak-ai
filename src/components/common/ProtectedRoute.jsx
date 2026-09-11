import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export function ProtectedRoute({ adminOnly = false }) {
  const { user, authLoading, isAuthenticated, isAdmin } = useAuth();
  const location = useLocation();

  // Wait until session check is complete
  if (authLoading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#071b2d",
          color: "white",
          fontSize: "18px",
        }}
      >
        Checking session...
      </div>
    );
  }

  // Not logged in
  if (!isAuthenticated || !user) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location }}
      />
    );
  }

  // Admin page but logged-in user is not admin
  if (adminOnly && !isAdmin) {
    return (
      <Navigate
        to="/user-dashboard"
        replace
      />
    );
  }

  return <Outlet />;
}