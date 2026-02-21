import { Navigate, Outlet, useLocation } from "react-router-dom";

const ProtectedRoute = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const urlToken = queryParams.get("token");

  if (urlToken) {
    localStorage.setItem("token", urlToken);
    // Clean up the URL
    window.history.replaceState({}, document.title, location.pathname);
  }

  const token = localStorage.getItem("token");

  return token ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
