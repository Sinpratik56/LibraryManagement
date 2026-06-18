import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function AdminOnly({ children }) {

    const { user } = useAuth();

    if (
        user?.user?.role !== "Admin"
    ) {

        return (
            <Navigate
                to="/dashboard"
                replace
            />
        );
    }

    return children;
}

export default AdminOnly;