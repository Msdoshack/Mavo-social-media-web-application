const { useLocation, Navigate, Outlet } = require("react-router-dom");
const { useAuth } = require("../hooks/useAuth");

const ReqireAuth = () => {
  const { currentUser } = useAuth();
  const location = useLocation();

  return currentUser?.id ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default ReqireAuth;
