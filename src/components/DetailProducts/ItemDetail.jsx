import PropTypes from "prop-types";
import { getCookiesByName } from "../../utils/formsUtils";
//REACT ROUTER DOM
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import AddToCartButton from "../CartMP/AddToCartButton";
import "./ItemCount.css";
import { HOST } from "../../config/config";

const ItemDetail = ({ product }) => {
  const { _id, title, thumbnails, category, description, price, stock, code } =
    product;
  const [userId, setUserId] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [addToCartClicked, setAddToCartClicked] = useState(false);

  useEffect(() => {
    const dataUser = async () => {
      try {
        const token = getCookiesByName("jwtCookie");

        if (!token) return;

        const { user } = JSON.parse(atob(token.split(".")[1]));
        const userId = user._id;

        setUserId(userId);
      } catch (error) {
        console.error(`Error al obtener información, ${error}`);
      }
    };

    dataUser();
  }, []);

  const increment = () => {
    if (quantity < stock) {
      setQuantity(quantity + 1);
    }
  };
  const decrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = () => {
    setAddToCartClicked(true);
  };

  if (!product) {
    return null;
  }

  return (
    <>
      <div className="card">
        <div className="image-box">
          {thumbnails.map((thumbnail, index) => (
            <img
              key={index}
              src={`${HOST}/static/products/img/${thumbnail.name}`}
              alt={`${title}-${index}`}
            />
          ))}
        </div>

        <div className="oneCard">
          <h3>{title}</h3>
          <p>
            <strong> Descripción: </strong>
            {description}
          </p>
          <h4>
            <strong>Categoría:</strong> {category}
          </h4>
          <p>
            <strong>Precio:</strong> ${price}
          </p>
          <p>
            <strong>Stock:</strong> {stock}
          </p>
          <p>
            <strong>Código:</strong> {code}
          </p>
          <div className="counter">
            <div className="controls">
              <button onClick={decrement} className="btnItemCount">
                -
              </button>
              <h4 className="numberItemCount">{quantity}</h4>
              <button onClick={increment} className="btnItemCount">
                +
              </button>
            </div>
          </div>

          {addToCartClicked ? (
            <>
              <Link to={`/cart/${userId}`}>Ver Carrito</Link>
              <Link to={`/`}>Ver más productos</Link>
            </>
          ) : (
            <AddToCartButton
              productId={_id}
              quantity={quantity}
              onClick={() => handleAddToCart()}
            />
          )}
        </div>
      </div>
    </>
  );
};

ItemDetail.propTypes = {
  product: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    stock: PropTypes.number.isRequired,
    thumbnails: PropTypes.array.isRequired,
    code: PropTypes.string.isRequired,
  }).isRequired,
};

export default ItemDetail;
