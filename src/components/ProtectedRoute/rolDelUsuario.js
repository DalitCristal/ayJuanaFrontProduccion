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
      console.error(`Error al decodificar ${error} `);
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
      console.error(`Error al decodificar, ${error}`);
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
      console.error(`Error al decodificar, ${error}`);
    }
  }

  return null;
};
