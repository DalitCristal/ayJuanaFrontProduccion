import PropTypes from "prop-types";
import { useRef } from "react";
import { getCookiesByName } from "../../../utils/formsUtils.js";
import { useNavigate } from "react-router-dom";
import { isTokenExpired } from "../../../utils/formsUtils.js";
import { validateData } from "./ValidateDataProduct.jsX";
import postProduct from "./FetchPost.jsx";
import InputForm from "./InputForm.jsx";
import Swal from "sweetalert2";
//STYLES
import "./NewProduct.css";

const NewProductForm = ({ onSubmit }) => {
  const formuRef = useRef(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataFormu = new FormData(formuRef.current);
    const data = Object.fromEntries(dataFormu);

    const errorMessage = await validateData(data);

    if (errorMessage) {
      Swal.fire({
        title: `${errorMessage} `,
        icon: "warning",
        showConfirmButton: false,
        timer: 2000,
      });
      return;
    }

    const token = getCookiesByName("jwtCookie");

    if (isTokenExpired(token)) {
      document.cookie =
        "jwtCookie=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

      Swal.fire({
        title: "Sesión expirada",
        icon: "info",
        showConfirmButton: false,
        timer: 1500,
      });

      navigate("/login");
      return;
    }

    const fetchPost = async () => {
      try {
        const product = await postProduct({ token: token, data: data });
        Swal.fire({
          title: `Producto creado con éxito, ${product.title} `,
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });

        navigate("/products");
      } catch (error) {
        if (error.includes("código ya existente")) {
          Swal.fire({
            title: `El código ya existe. Por favor, elige otro.`,
            icon: "warning",
            showConfirmButton: false,
            timer: 2000,
          });
        } else {
          Swal.fire({
            title: `Error al crear el producto: ${error} `,
            icon: "error",
            showConfirmButton: false,
            timer: 2000,
          });
        }
      }
    };

    fetchPost();
  };

  return (
    <>
      <h1 className="titleFormu">Crear nuevo producto</h1>
      <form
        onSubmit={(e) => onSubmit(e, handleSubmit)}
        ref={formuRef}
        className="containerFormu"
      >
        <InputForm
          label="Título*"
          type="text"
          id="title"
          name="title"
          className="inputNewProduct"
          classNameLabel="labelNewProduct"
        />
        <label className="textareaNewProduct">
          Descripción*
          <textarea
            type="text"
            id="description"
            name="description"
            className="textareaNewProduct"
            required
          />
        </label>
        <label className="labelNewProduct">
          Categoría*
          <select name="category" className="inputNewProduct" required>
            <option value="">Seleccione una categoría</option>
            <option value="t-shirt">Remeras</option>
            <option value="pants">Pantalones</option>
            <option value="coat">Abrigos</option>
          </select>
        </label>
        <InputForm
          label="Código*"
          type="text"
          id="code"
          name="code"
          className="inputNewProduct"
          classNameLabel="labelNewProduct"
        />
        <InputForm
          label="Precio*"
          type="number"
          id="price"
          name="price"
          className="inputNewProduct"
          classNameLabel="labelNewProduct"
        />
        <InputForm
          label="Stock*"
          type="number"
          id="stock"
          name="stock"
          className="inputNewProduct"
          classNameLabel="labelNewProduct"
        />

        <label className="labelNewProduct">
          Habilitado para e-commerce*
          <select name="status" className="inputNewProduct">
            <option value={true}>Sí</option>
            <option value={false}>No</option>
          </select>
        </label>
        <label className="labelNewProduct">
          URL de las imágenes
          <textarea
            type="text"
            name="thumbnails"
            className="textareaNewProduct"
            placeholder="Estamos trabajando en esta funcionalidad, muy pronto estará habilitada para su uso, gracias!"
            disabled
          />
        </label>

        <button type="submit" className="btnFormu">
          Crear Producto
        </button>
      </form>
    </>
  );
};

NewProductForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default NewProductForm;
