import { HOST } from "../../../config/config";

const getProducts = async ({
  page = 1,
  pageSize = 12,
  category,
  status,
  sort,
}) => {
  try {
    let apiUrl = `${HOST}/api/products?page=${page}&limit=${pageSize}`;

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
      console.error(`Error ${response.status} `);

      return [];
    }
  } catch (error) {
    console.error(`Error ${error}`);

    return [];
  }
};

export default getProducts;
