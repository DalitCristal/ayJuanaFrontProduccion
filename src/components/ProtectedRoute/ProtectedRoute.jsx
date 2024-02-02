// ProtectedRoute.jsx
import PropTypes from "prop-types";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUserRole } from "./rolDelUsuario";
import { getCookiesByName, isTokenExpired } from "../../utils/formsUtils";

const ProtectedRoute = ({ role, children }) => {
  const navigate = useNavigate();
  const userRole = getUserRole();
  const token = getCookiesByName("jwtCookie");

  const isAuthorized = () => {
    return Array.isArray(role) ? role.includes(userRole) : role === userRole;
  };

  useEffect(() => {
    if (isTokenExpired(token)) {
      document.cookie =
        "jwtCookie=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

      navigate("/login");
      return;
    } else if (!isAuthorized()) {
      // Si el usuario no está autorizado
      navigate("/unauthorized", { replace: true });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, userRole, navigate]);

  return isAuthorized() ? <>{children}</> : null;
};

ProtectedRoute.propTypes = {
  role: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]).isRequired,
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
