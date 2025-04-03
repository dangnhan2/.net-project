import { useContext } from "react";
import { UserContext } from "../../context/Context";
import { Navigate, useLocation } from "react-router-dom";
import { BeatLoader } from "react-spinners";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isRefreshing } = useContext(UserContext);
  const location = useLocation();

  if (isRefreshing) {
    return (
      <div>
        <BeatLoader
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
      </div>
    ); // Hiển thị màn hình chờ
  }

  if (!isAuthenticated && location.pathname !== "/login") {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
