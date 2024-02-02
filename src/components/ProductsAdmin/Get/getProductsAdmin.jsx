import { HOST } from "../../../config/config";
import Swal from "sweetalert2";

const getProducts = async ({
  page = 1,
  pageSize = 12,
  category,
  status,
  sort,
}) => {
  try {
    let apiUrl = `${HOST}/api/products?page=${page}&pageSize=${pageSize}`;

    // Agregar filtros
    if (category) {
      apiUrl += `&category=${category}`;
    }

    if (status) {
      apiUrl += `&status=${status}`;
    }

    if (sort) {
      apiUrl += `&sort=${sort}`;
    }

    const response = await fetch(apiUrl);

    if (response.status === 200) {
      const responseData = await response.json();
      const productsArray = responseData.mensaje;

      return productsArray;
    } else {
      Swal.fire({
        title: `Error ${response.status} `,
        icon: "error",
        showConfirmButton: false,
        timer: 2000,
      });

      return [];
    }
  } catch (error) {
    Swal.fire({
      title: `Error ${error} `,
      icon: "error",
      showConfirmButton: false,
      timer: 2000,
    });

    return [];
  }
};

export default getProducts;
