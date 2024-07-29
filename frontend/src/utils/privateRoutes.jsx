import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";



export function PrivateRoute() {
    const {user} = useContext(AuthContext)
    
    return user ? <Outlet /> : <Navigate to="/auth/login" />
}