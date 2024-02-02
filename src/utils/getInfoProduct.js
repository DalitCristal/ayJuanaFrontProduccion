import { HOST } from "../config/config";
import Swal from "sweetalert2";

export const getInfoProduct = async (productId) => {
  try {
    const response = await fetch(`${HOST}/api/products/${productId}`, {
      method: "GET",
    });
    if (response.status === 200) {
      const data = await response.json();
      return data.mensaje;
    } else if (response.status === 404) {
      return null;
    } else {
      const errorData = await response.json();
      Swal.fire({
        title: `Error al obtener producto: ${errorData} `,
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
  }
};
