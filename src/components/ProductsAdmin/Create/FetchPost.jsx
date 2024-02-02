import { HOST } from "../../../config/config";
import Swal from "sweetalert2";

const postProduct = async ({ token, data }) => {
  try {
    let apiUrl = `${HOST}/api/products`;

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
      credentials: "include",
    });

    if (!response.ok) {
      if (response.status >= 500) {
        Swal.fire({
          title: `Error del servidor: ${response.status}, ${response} `,
          icon: "error",
          showConfirmButton: false,
          timer: 2000,
        });
      }
    }

    try {
      const responseData = await response.json();
      const product = responseData.mensaje;
      return product;
    } catch (error) {
      Swal.fire({
        title: ` ${error}, código ya existente.`,
        icon: "error",
        showConfirmButton: false,
        timer: 2000,
      });
    }
  } catch (error) {
    Swal.fire({
      title: `Error en la solicitud al servidor: ${error} `,
      icon: "error",
      showConfirmButton: false,
      timer: 2000,
    });
  }
};

export default postProduct;
