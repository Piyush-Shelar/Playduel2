import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    // Not logged in → go to home page
    return <Navigate to="/" replace />;
  }

  // Logged in → allow access
  return children;
};

export default ProtectedRoute;
