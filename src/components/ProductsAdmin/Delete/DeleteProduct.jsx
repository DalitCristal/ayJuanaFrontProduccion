import { useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { getCookiesByName, isTokenExpired } from "../../../utils/formsUtils.js";
import { HOST } from "../../../config/config.js";
import Swal from "sweetalert2";
import "./DeleteProduct.css";

const DeleteProduct = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    try {
      setLoading(true);

      const token = getCookiesByName("jwtCookie");

      if (isTokenExpired(token)) {
        document.cookie =
          "jwtCookie=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

        Swal.fire({
          title: `Sesión expirada`,
          icon: "info",
          showConfirmButton: false,
          timer: 1500,
        });

        navigate("/login");
        return;
      }

      const response = await fetch(`${HOST}/api/products/${productId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
      });

      if (response.status === 200) {
        Swal.fire({
          title: `Producto eliminado exitosamente.`,
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });
        /* DESPUES DE ELIMINAR EL PRODUCTO, HAY QUE ENVIARLE UN EMAIL AL OWNER, AVISANDOLE DE QUE SU PRODUCTO FUE ELIMINADO POR ADMIN */

        navigate("/products");
      } else {
        const errorData = await response.json();
        Swal.fire({
          title: `Error al eliminar el producto: ${errorData} `,
          icon: "error",
          showConfirmButton: false,
          timer: 2000,
        });
      }
    } catch (error) {
      Swal.fire({
        title: `Error en la solicitud, ${error} `,
        icon: "error",
        showConfirmButton: false,
        timer: 2000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="boxDeleteProduct">
        <p className="textDeleteProduct">
          ¿Estás seguro que deseas eliminar el producto? Esta acción no se puede
          deshacer.
        </p>

        {loading ? (
          "Eliminando..."
        ) : (
          <button
            onClick={handleDelete}
            disabled={loading}
            className="btnDeleteProduct"
          >
            Eliminar Producto
          </button>
        )}

        <Link to={"/products"} className="btnCancel">
          Cancelar
        </Link>
      </div>
    </>
  );
};

export default DeleteProduct;
