import { getCookiesByName } from "./formsUtils";
import { HOST } from "../config/config";
import Swal from "sweetalert2";

// Función para obtener los detalles del usuario por Id
export const fetchUserData = async (id) => {
  try {
    const token = getCookiesByName("jwtCookie");

    const response = await fetch(`${HOST}/api/users/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
    });
    if (response.status === 200) {
      const data = await response.json();
      return { data: data.mensaje };
    } else {
      const errorData = await response.json();
      Swal.fire({
        title: `Error al obtener información, ${errorData.mensaje} `,
        icon: "error",
        showConfirmButton: false,
        timer: 2000,
      });

      return { error: errorData.mensaje };
    }
  } catch (error) {
    Swal.fire({
      title: `Error en la solicitud, ${error} `,
      icon: "error",
      showConfirmButton: false,
      timer: 2000,
    });

    return;
  }
};

// Actualizar el rol del usuario
export const updateUser = async (id, updatedUserData) => {
  try {
    const token = getCookiesByName("jwtCookie");

    const response = await fetch(`${HOST}/api/users/premium/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedUserData),
      credentials: "include",
    });

    if (response.status === 200) {
      const data = await response.json();
      return data;
    } else {
      const errorData = await response.json();
      Swal.fire({
        title: `${errorData.mensaje} `,
        icon: "error",
        showConfirmButton: false,
        timer: 2000,
      });
    }
  } catch (error) {
    Swal.fire({
      title: `Error al actualizar los datos del usuario: ${error} `,
      icon: "error",
      showConfirmButton: false,
      timer: 2000,
    });
  }
};
