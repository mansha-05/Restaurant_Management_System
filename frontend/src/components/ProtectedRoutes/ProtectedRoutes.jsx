import { Navigate } from "react-router-dom";
import { useAuth } from "../../providers/AuthProvider";

function ProtectedRoute({ children, allowedRoles }) {
  const { user, loading } = useAuth();

  if (loading) return null;

  if (!user) return <Navigate to="/home/login" replace />;

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/home/login" replace />;
  }

  return children;
}

export default ProtectedRoute;