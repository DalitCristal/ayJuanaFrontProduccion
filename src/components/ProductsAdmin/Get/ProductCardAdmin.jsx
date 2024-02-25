import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchUserData } from "../../../utils/fetchUserData";
import { HOST } from "../../../config/config";

const ProductCardAdmin = ({ product }) => {
  const {
    id,
    title,
    description,
    price,
    stock,
    category,
    status,
    thumbnails,
    code,
    owner,
  } = product;

  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await fetchUserData(owner);
        setUserData(user);
      } catch (error) {
        console.error(`Error en la solicitud, ${error}`);
      }
    };

    fetchData();
  }, [owner]);

  return (
    <div className="product-card">
      <img
        src={`${HOST}/static/products/img/${thumbnails[0].name}`}
        alt={`${title}-${id}`}
      />
      <div className="product-details">
        <h2>Título: {title}</h2>
        <p>Descripción: {description}</p>
        <p>Precio: ${price}</p>
        <p>Stock: {stock}</p>
        <p>Categoría: {category}</p>
        <p>Habilitado en la tienda: {status ? "Sí" : "No"}</p>
        <p>Código: {code}</p>
        {userData ? (
          <>
            <p>
              Titular: {userData.data.first_name} {userData.data.last_name}
            </p>
            <p>Rol: {userData.data.rol}</p>
          </>
        ) : null}
      </div>
      <Link to={`/products/edit/${id}`} className="option">
        Editar producto
      </Link>
      <Link to={`/products/delete/${id}`} className="option">
        Eliminar producto
      </Link>
    </div>
  );
};

ProductCardAdmin.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    stock: PropTypes.number.isRequired,
    category: PropTypes.string.isRequired,
    status: PropTypes.bool.isRequired,
    thumbnails: PropTypes.array.isRequired,
    code: PropTypes.string.isRequired,
    owner: PropTypes.string.isRequired,
  }),
};

export default ProductCardAdmin;
