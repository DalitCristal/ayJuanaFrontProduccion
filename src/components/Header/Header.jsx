import { useState, useEffect } from "react";
import { getUserRole, getUserId } from "../ProtectedRoute/rolDelUsuario.js";
import ProductSearchForm from "../ProductsUser/ProductSearchForm.jsx";
import CartWidget from "../CartMP/CartWidget.jsx";
import logo from "/ay-juana-logo.png";
import Navbar from "../Navigation/NavBar.jsx";
import ProfileMenu from "../Navigation/ProfileMenu.jsx";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const [userRole, setUserRole] = useState("");
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const roleFromCookies = getUserRole();
    setUserRole(roleFromCookies);
  }, []);

  useEffect(() => {
    const idFromCookies = getUserId();
    setUserId(idFromCookies);
  }, []);

  return (
    <>
      <div className="headerContainer">
        <div className="logoHeader">
          <Link to={"/"}>
            <img src={logo} alt="ay juana logo" />
          </Link>
        </div>
        <ProductSearchForm />
        <ul className="buttonsHeader">
          <ProfileMenu userId={userId} userRole={userRole} />
          <CartWidget />
        </ul>
      </div>

      <Navbar userRole={userRole || "user"} />
    </>
  );
};

export default Header;
