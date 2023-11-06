import { Navigate, Outlet } from "react-router-dom";
import useSession from "../Context/UseSession"
import { PublicRoutes } from "../../Router/Routes";

export const AuthGuard = () => {

  const { user } = useSession();
  
  return  user.access_token ? < Outlet /> : <Navigate to={ PublicRoutes.LOGIN} /> 
}

