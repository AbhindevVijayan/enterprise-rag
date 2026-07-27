import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
    children: React.ReactNode;
}

export default function ProtectedRoute({
    children,
}: ProtectedRouteProps) {

    const token = localStorage.getItem("access");

    console.log("ProtectedRoute token:", token);

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    return <>{children}</>;
}