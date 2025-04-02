import { useContext } from "react";
import { UserContext } from "../../context/Context";
import { Button, Result } from "antd";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, setIsAuthenticated, user, setUser } =
    useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();
  if (!isAuthenticated && location.pathname === "/") {
    return <Navigate to="/login" replace />;
  }

  if (!isAuthenticated) {
    return (
      <Result
        status="403"
        title="Unauthorized"
        subTitle="You must be logged in to access this page."
        extra={
          <Button type="primary" onClick={() => navigate("/login")}>
            Go to Login
          </Button>
        }
      />
    );
  }
  return children;
};

export default ProtectedRoute;
