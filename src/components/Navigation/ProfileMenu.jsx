import { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import "./ProfileMenu.css";

const ProfileMenu = ({ userId, userRole }) => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <div className="profileMenu">
      <Link onClick={toggleMenu}>
        <PersonIcon />
      </Link>

      {isMenuOpen && userRole && (
        <ul className="dropdownMenu">
          <li>
            <Link to={`/profile/${userId}`}>Mi perfil</Link>
          </li>
          <li>
            <Link to="/logout">Cerrar Sesión</Link>
          </li>
        </ul>
      )}

      {!userRole && (
        <ul className="dropdownMenu">
          <li>
            <Link to="/login">Iniciar Sesión</Link>
          </li>
          <li>
            <Link to="/register">Registrarse</Link>
          </li>
        </ul>
      )}
    </div>
  );
};

ProfileMenu.propTypes = {
  userId: PropTypes.string,
  userRole: PropTypes.string,
};

export default ProfileMenu;
