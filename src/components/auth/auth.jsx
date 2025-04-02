import { useContext } from "react";
import { UserContext } from "../../context/Context";
import { Button, Result } from "antd";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, setIsAuthenticated, user, setUser } =
    useContext(UserContext);
  // const navigate = useNavigate();
  // const location = useLocation();
  // if (isAuthenticated === false) {
  //   return <Navigate to="/login" replace />;
  // }

  return children;
};

export default ProtectedRoute;
