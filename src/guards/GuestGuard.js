import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

GuestGuard.propTypes = {
  children: PropTypes.node
};

export default function GuestGuard({ children }) {
  const { isAuthenticated, user } = useAuth();

  if (isAuthenticated) {
    console.log(user.Role);
    if (user.Role === "employee") {
      return <Navigate to={"/ee"} />;
    } else if (user.Role === "projectAdmin") {
      return <Navigate to={"/pa"} />;
    } else if (user.Role === "systemAdmin") {
      return <Navigate to={"/sa"} />;
    }
  }

  return <>{children}</>;
}
