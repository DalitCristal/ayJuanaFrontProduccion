import { HOST } from "../config/config";

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
      console.error(`Error al obtener producto: ${errorData}`);
    }
  } catch (error) {
    console.error(`Error en la solicitud, ${error} `);
  }
};
