import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { HOST } from "../../config/config";
import Swal from "sweetalert2";
import { getCookiesByName } from "../../utils/formsUtils";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const logout = async () => {
      try {
        const token = getCookiesByName("jwtCookie");

        const response = await fetch(`${HOST}/api/session/logout`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
        });

        if (response.status === 200) {
          Swal.fire({
            position: "top-center",
            title: `Sesión cerrada con éxito.`,
            showConfirmButton: false,
            timer: 1500,
          });

          navigate("/", { replace: true });
        } else {
          Swal.fire({
            title: `Error al cerrar sesión: ${response.mensaje} `,
            icon: "error",
            showConfirmButton: false,
            timer: 2000,
          });
        }
      } catch (error) {
        Swal.fire({
          title: `Error en la solicitud: ${error} `,
          icon: "error",
          showConfirmButton: false,
          timer: 2000,
        });
      }
    };

    logout();
  }, [navigate]);

  return <div>Saliendo de tu cuenta...</div>;
};

export default Logout;
