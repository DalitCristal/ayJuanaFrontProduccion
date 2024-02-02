import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { HOST } from "../../config/config";

const ProductCard = ({ product }) => {
  const { id, title, description, price, thumbnails } = product;

  return (
    <div className="product-card">
      <img
        src={`${HOST}/static/products/img/${thumbnails[0].name}`}
        alt={`${title}-${id}`}
      />

      <div className="product-details">
        <h2>{title}</h2>
        <p>{description}</p>
        <p>Precio: ${price}</p>
      </div>
      <Link to={`/product/${id}`} className="option">
        Más detalles
      </Link>
    </div>
  );
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    thumbnails: PropTypes.array.isRequired,
  }).isRequired,
};

export default ProductCard;
