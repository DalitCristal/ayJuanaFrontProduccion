import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getCookiesByName, isTokenExpired } from "../../../utils/formsUtils";
import Swal from "sweetalert2";
import { HOST } from "../../../config/config.js";
import "./EditProduct.css";
import { getUserRole } from "../../ProtectedRoute/rolDelUsuario.js";

const EditProduct = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const formuRef = useRef(null);

  const [productData, setProductData] = useState({
    title: "",
    description: "",
    price: 0,
    stock: 0,
    code: "",
    status: true,
    thumbnails: [],
    category: "",
  });

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await fetch(`${HOST}/api/products/${productId}`, {
          method: "GET",
        });

        const data = await response.json();
        setProductData(data.mensaje);
      } catch (error) {
        Swal.fire({
          title: `Error al obtener los detalles del producto, ${error} `,
          icon: "error",
          showConfirmButton: false,
          timer: 2000,
        });
      }
    };

    fetchProductData();
  }, [productId]);

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;

    setProductData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? e.target.checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataFormu = new FormData(formuRef.current);
    const data = Object.fromEntries(dataFormu);
    const token = getCookiesByName("jwtCookie");
    const userRole = getUserRole();

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

    if (typeof data.title !== "string" || !isNaN(Number(data.title))) {
      Swal.fire({
        title: `Título debe ser una cadena de texto.`,
        icon: "error",
        showConfirmButton: false,
        timer: 2000,
      });
      return;
    }

    try {
      const response = await fetch(`${HOST}/api/products/${productId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          rol: userRole,
          "Content-type": "application/json",
        },
        body: JSON.stringify(data),
        credentials: "include",
      });

      if (response.status === 200) {
        Swal.fire({
          title: `Producto actualizado`,
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });

        navigate("/products");
      } else {
        const errorData = await response.json();
        Swal.fire({
          title: `Error en la actualización, ${errorData.mensaje} `,
          icon: "error",
          showConfirmButton: false,
          timer: 2000,
        });
      }
    } catch (error) {
      console.error(`Error en la solicitud, ${error.mensaje}`);
    }
  };

  return (
    <div className="containerEditProduct">
      <h1 className="titleEditProduct">Editar Producto</h1>

      <form onSubmit={handleSubmit} ref={formuRef} className="formEditProduct">
        <label className="labelEditProduct">
          Título:
          <input
            type="text"
            name="title"
            value={productData.title}
            onChange={handleInputChange}
            className="inputEditProduct"
          />
        </label>
        <label className="labelEditProduct">
          Descripción:
          <textarea
            name="description"
            value={productData.description}
            onChange={handleInputChange}
            className="textareaEditProduct"
          />
        </label>
        <label className="labelEditProduct">
          Precio:
          <input
            type="number"
            name="price"
            value={productData.price}
            onChange={handleInputChange}
            className="inputEditProduct"
          />
        </label>
        <label className="labelEditProduct">
          Stock:
          <input
            type="number"
            name="stock"
            value={productData.stock}
            onChange={handleInputChange}
            className="inputEditProduct"
          />
        </label>
        <label className="labelEditProduct">
          Código:
          <input
            type="text"
            name="code"
            value={productData.code}
            onChange={handleInputChange}
            className="inputEditProduct"
          />
        </label>
        <label className="labelEditProduct">
          Habilitado para e-commerce:
          <select
            name="status"
            value={productData.status}
            onChange={handleInputChange}
            className="inputEditProduct"
          >
            <option value={true}>Sí</option>
            <option value={false}>No</option>
          </select>
        </label>
        <label className="labelEditProduct">
          Categoría:
          <input
            type="text"
            name="category"
            value={productData.category}
            onChange={handleInputChange}
            className="inputEditProduct"
          />
        </label>

        <button type="submit" className="btnEditProduct">
          Guardar Cambios
        </button>
      </form>
    </div>
  );
};

export default EditProduct;
