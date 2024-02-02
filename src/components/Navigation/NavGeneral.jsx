//REACT ROUTER DOM
import { NavLink } from "react-router-dom";

const NavGeneral = () => {
  return (
    <ul className="buttonsNav">
      <NavLink
        to={"/"}
        className={({ isActive }) => (isActive ? "ActiveOption" : "Option")}
      >
        Inicio
      </NavLink>

      <NavLink
        to={`/category/coat`}
        className={({ isActive }) => (isActive ? "ActiveOption" : "Option")}
      >
        Abrigos
      </NavLink>
      <NavLink
        to={`/category/pants`}
        className={({ isActive }) => (isActive ? "ActiveOption" : "Option")}
      >
        Pantalones
      </NavLink>
      <NavLink
        to={`/category/t-shirt`}
        className={({ isActive }) => (isActive ? "ActiveOption" : "Option")}
      >
        Remeras
      </NavLink>
    </ul>
  );
};

export default NavGeneral;
