import Swal from "sweetalert2";

export const getUserRole = () => {
  // Obtener el token desde las cookies
  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("jwtCookie="))
    ?.split("=")[1];

  if (token) {
    try {
      const decodedToken = JSON.parse(atob(token.split(".")[1]));

      return decodedToken.user.rol;
    } catch (error) {
      Swal.fire({
        title: `Error al decodificar ${error} `,
        icon: "error",
        showConfirmButton: false,
        timer: 2000,
      });
    }
  }

  return null;
};

export const getUserId = () => {
  // Obtener el token desde las cookies
  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("jwtCookie="))
    ?.split("=")[1];

  if (token) {
    try {
      const decodedToken = JSON.parse(atob(token.split(".")[1]));

      return decodedToken.user._id;
    } catch (error) {
      Swal.fire({
        title: `Error al decodificar, ${error} `,
        icon: "error",
        showConfirmButton: false,
        timer: 2000,
      });
    }
  }

  return null;
};

export const getUserFirstName = () => {
  // Obtener el token desde las cookies
  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("jwtCookie="))
    ?.split("=")[1];

  if (token) {
    try {
      const decodedToken = JSON.parse(atob(token.split(".")[1]));

      return decodedToken.user.first_name;
    } catch (error) {
      Swal.fire({
        title: `Error al decodificar, ${error} `,
        icon: "error",
        showConfirmButton: false,
        timer: 2000,
      });
    }
  }

  return null;
};
