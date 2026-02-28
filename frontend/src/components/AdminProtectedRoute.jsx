import { Navigate } from "react-router-dom";

export default function AdminProtectedRoute({ children }) {
  const admin = localStorage.getItem("admin");

  if (!admin) {
    return <Navigate to="/admin-login" replace />;
  }

  return children;
}
