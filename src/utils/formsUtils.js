export const getCookiesByName = (name) => {
  const cookies = document.cookie.split(";");
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.startsWith(name + "=")) {
      return cookie.substring(name.length + 1);
    }
  }

  return null;
};

// Verifica si el token ha expirado
export const isTokenExpired = (token) => {
  if (!token) {
    return true; // Si no hay token
  }

  const decodedToken = parseJwt(token);

  if (!decodedToken || !decodedToken.exp) {
    return true; // Si no se puede decodificar el token o no tiene información de expiración, se considera como expirado
  }

  const expirationTime = decodedToken.exp;

  const currentTime = Math.floor(Date.now() / 1000);

  return expirationTime < currentTime;
};

// Decodificar el token
const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    return null;
  }
};
