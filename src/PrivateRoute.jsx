import Background from "./components/Background/Background";
import useUserContext from "./hooks/useUserContext";
import { Outlet, Navigate, useLocation } from "react-router-dom";

export default function PrivateRoute() {
  const { user, isLoading } = useUserContext();
  const location = useLocation();

  if (!user && isLoading) return <Background />;

  return user ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} />
  );
}
