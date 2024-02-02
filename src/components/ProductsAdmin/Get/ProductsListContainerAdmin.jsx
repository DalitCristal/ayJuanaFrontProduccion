import { useState, useEffect } from "react";
import ProductsListAdmin from "./ProductsListAdmin.jsx";
import getProductsAdmin from "./getProductsAdmin.jsx";
import Swal from "sweetalert2";
import "./ProductsListContainerAdmin.css";

const ProductsListContainerAdmin = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const allProducts = await getProductsAdmin({
          page: currentPage,
          pageSize: 12,
          status: true,
          sort: "asc",
        });

        // Verificar si hay más productos en la página siguiente
        setHasMore(allProducts.length === 12);

        setProducts(allProducts);
      } catch (error) {
        Swal.fire({
          title: `Error al recuperar productos: ${error} `,
          icon: "error",
          showConfirmButton: false,
          timer: 1500,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [currentPage]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <>
      <div>
        <h1 className="title-page-products">Lista de Productos</h1>
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

        <ProductsListAdmin products={products} />
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

export default ProductsListContainerAdmin;
