import { Outlet, Navigate } from "react-router-dom";

import { useLogin } from "../../context/LoginContext";

function Admin() {
  const { user } = useLogin();

  if (user && user.role === "admin") {
    return (
      <div className="admin-container">
        <Outlet />
      </div>
    );
  }
  return <Navigate to="/" replace />;
}

export default Admin;
