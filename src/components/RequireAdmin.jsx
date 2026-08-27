import { Navigate } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";

function RequireAdmin({ children }) {
  const isAdmin = useAuthStore((state) => state.isAdmin);

  if (!isAdmin) {
    return <Navigate to="/products" replace />;
  }

  return children;
}

export default RequireAdmin;