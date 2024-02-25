import { useRef } from "react";
import PropTypes from "prop-types";
import { getCookiesByName, isTokenExpired } from "../../../utils/formsUtils";
import { useNavigate } from "react-router-dom";
import { HOST } from "../../../config/config";
import Swal from "sweetalert2";

const ImageUpload = ({ productId }) => {
  const fileInputRef = useRef(null);

  const navigate = useNavigate();

  const handleFileChange = async () => {
    const files = fileInputRef.current?.files;

    if (files && files.length > 0) {
      const formData = new FormData();
      formData.append("product", files[0]);

      try {
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

        const response = await fetch(
          `${HOST}/api/products/${productId}/thumbnails`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-type": "application/json",
            },
            body: formData,
            credentials: "include",
          }
        );

        if (response.status === 200) {
          const result = await response.json();
          Swal.fire({
            title: `Se subio correctamente la imagen, ${result.payload.thumbnails} `,
            icon: "success",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate("/products");
        } else {
          const errorData = await response.json();
          Swal.fire({
            title: `Error al subir la imagen: ${errorData.error} `,
            icon: "error",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      } catch (error) {
        console.error(`Error en la solicitud, ${error}`);
      }
    }
  };

  return (
    <>
      <div>
        <input
          type="file"
          name="product"
          ref={fileInputRef}
          onChange={handleFileChange}
        />
      </div>
    </>
  );
};

ImageUpload.propTypes = {
  productId: PropTypes.string.isRequired,
};

export default ImageUpload;
