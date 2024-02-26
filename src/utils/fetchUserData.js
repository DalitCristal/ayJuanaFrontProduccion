import { getCookiesByName } from "./formsUtils";
import { HOST } from "../config/config";
import { getUserRole } from "../components/ProtectedRoute/rolDelUsuario";

// Función para obtener los detalles del usuario por Id
export const fetchUserData = async (id) => {
  try {
    const token = getCookiesByName("jwtCookie");
    const userRole = getUserRole();

    const response = await fetch(`${HOST}/api/users/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        rol: userRole,
      },
      credentials: "include",
    });
    if (response.status === 200) {
      const data = await response.json();
      return { data: data.mensaje };
    } else {
      const errorData = await response.json();
      console.error(`Error al obtener información, ${errorData.mensaje} `);

      return { error: errorData.mensaje };
    }
  } catch (error) {
    console.error(`Error en la solicitud, ${error}`);

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
      console.error(`${errorData.mensaje}`);
    }
  } catch (error) {
    console.error(`Error al actualizar los datos del usuario: ${error}`);
  }
};
