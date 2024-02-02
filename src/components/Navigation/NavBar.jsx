import PropTypes from "prop-types";
//STYLES
import "./NavBar.css";
//COMPONENTS
import NavGeneral from "./NavGeneral";
import NavPremium from "./NavPremium";
import NavAdmin from "./NavAdmin";

const Navbar = ({ userRole }) => {
  return (
    <nav className="navBar">
      {userRole === "admin" && (
        <>
          {/* Menú para admin */}
          <NavAdmin />
        </>
      )}

      {userRole === "premium" && (
        <>
          {/* Menú para premium */}
          <NavPremium />
        </>
      )}

      {userRole !== "admin" && userRole !== "premium" && (
        /* Menú para usuarios regulares */
        <NavGeneral />
      )}
    </nav>
  );
};

Navbar.propTypes = {
  userRole: PropTypes.string.isRequired,
};

export default Navbar;
