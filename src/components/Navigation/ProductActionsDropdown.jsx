import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const ProductActionsDropdown = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const location = useLocation();

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    setIsDropdownOpen(false);
  }, [location.pathname]);

  const styles = {
    productActionsDropdown: {
      position: "relative",
      display: "inline-block",
    },
    dropdownButton: {
      fontSize: "16px",
      textTransform: "uppercase",
      backgroundColor: "#ce5b83",
      color: "#ffffff",
      border: "none",
      padding: "10px",
      cursor: "pointer",
    },
    dropdownContent: {
      display: isDropdownOpen ? "block" : "none",
      position: "absolute",
      backgroundColor: "#ffe1eb",
      boxShadow: "0px 8px 16px 0px rgba(0, 0, 0, 0.2)",
      zIndex: 10,
      width: "190px",
    },
    hidden: {
      textDecoration: "none",
      display: "block",
      color: "#000000",
      padding: "10px",
    },
    hoverEffect: {
      "&:hover": {
        backgroundColor: "hsla(339, 54%, 58%, 0.75)",
      },
    },
  };

  const {
    productActionsDropdown,
    dropdownButton,
    dropdownContent,
    hidden,
    hoverEffect,
  } = styles;

  return (
    <div style={productActionsDropdown}>
      <button style={dropdownButton} onClick={handleDropdownToggle}>
        PRODUCTOS
      </button>
      {isDropdownOpen && (
        <div style={dropdownContent}>
          <Link to={`/products`} style={{ ...hidden, ...hoverEffect }}>
            Ver productos
          </Link>
          <Link to={`/products/create`} style={{ ...hidden, ...hoverEffect }}>
            Crear productos
          </Link>
        </div>
      )}
    </div>
  );
};

export default ProductActionsDropdown;
