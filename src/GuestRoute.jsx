import Background from "./components/Background/Background";
import useUserContext from "./hooks/useUserContext";
import { Outlet, Navigate } from "react-router-dom";

export default function PrivateRoute() {
  const { user, isLoading } = useUserContext();

  if (!user && isLoading) return <Background />;

  return !user ? <Outlet /> : <Navigate to="/" />;
}
