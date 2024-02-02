import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import getProducts from "./getProducts";
import ProductCard from "./ProductCard";
import Swal from "sweetalert2";

const ProductsByCategory = () => {
  const { categoryName } = useParams();
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const categoryProducts = await getProducts({
          page: currentPage,
          pageSize: 12,
          category: categoryName,
        });

        setHasMore(categoryProducts.length === 12);

        setProducts(categoryProducts);
      } catch (error) {
        Swal.fire({
          title: `Error en la solid ${error} `,
          icon: "error",
          showConfirmButton: false,
          timer: 2000,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [currentPage, categoryName]);

  return (
    <>
      <div className="container containerByCategory">
        <h2>Categoria {categoryName}</h2>
        <div className="pagination">
          {currentPage > 1 && (
            <button onClick={() => handlePageChange(currentPage - 1)}>
              Anterior
            </button>
          )}
          {hasMore && (
            <button onClick={() => handlePageChange(currentPage + 1)}>
              Siguiente
            </button>
          )}
        </div>
        <ul>
          {products.map((product) => (
            <ProductCard key={product.code} product={product} />
          ))}
        </ul>
        <div className="pagination">
          {currentPage > 1 && (
            <button onClick={() => handlePageChange(currentPage - 1)}>
              Anterior
            </button>
          )}
          {hasMore && (
            <button onClick={() => handlePageChange(currentPage + 1)}>
              Siguiente
            </button>
          )}
        </div>
        {loading ? "Cargando..." : null}
      </div>
    </>
  );
};

export default ProductsByCategory;
