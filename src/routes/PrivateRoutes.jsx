import { useAuth } from "../context/Auth";
import { Navigate, Outlet } from "react-router-dom"; 

export const PrivateRoute = () => {
  const { signed } = useAuth();

  return signed ? <Outlet /> : <Navigate to="/" />;
};
