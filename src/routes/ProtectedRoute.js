import { Navigate } from "react-router-dom";
import { getAuthData } from "../utils/auth";

const ProtectedRoute = ({ children, allowedRole }) => {
  const auth = getAuthData();

  if (!auth) {
    return <Navigate to="/auth/login" />;
  }

  if (allowedRole && auth.role !== allowedRole) {
    return <Navigate to="/auth/login" />;
  }

  return children;
};

export default ProtectedRoute;
