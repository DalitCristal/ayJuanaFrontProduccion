import ProductActionsDropdown from "./ProductActionsDropdown";
import { NavLink } from "react-router-dom";

const NavAdmin = () => {
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

      <NavLink
        to={"/users"}
        className={({ isActive }) => (isActive ? "ActiveOption" : "Option")}
      >
        Usuarios
      </NavLink>
      <ProductActionsDropdown />
    </ul>
  );
};

export default NavAdmin;
