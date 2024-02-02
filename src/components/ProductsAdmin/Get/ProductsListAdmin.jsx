import PropTypes from "prop-types";
import ProductCardAdmin from "./ProductCardAdmin.jsx";

const ProductsListAdmin = ({ products }) => {
  return (
    <div className="product-list">
      {products.map((product) => (
        <ProductCardAdmin key={product.id} product={product} />
      ))}
    </div>
  );
};

ProductsListAdmin.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
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
    })
  ),
};

export default ProductsListAdmin;
