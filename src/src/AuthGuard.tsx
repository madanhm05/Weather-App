import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

interface AuthGuardProps {
  children: React.ReactNode;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <p>Loading...</p>;

  return user ? <>{children}</> : <Navigate to="/login" replace />;
};

export default AuthGuard;
