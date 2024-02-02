import PropTypes from "prop-types";
//COMPONENT
import ProductCard from "./ProductCard.jsx";

const ProductsList = ({ products }) => {
  return (
    <div className="product-list">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

ProductsList.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      stock: PropTypes.number.isRequired,
      category: PropTypes.string.isRequired,
      thumbnails: PropTypes.array.isRequired,
      code: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default ProductsList;
