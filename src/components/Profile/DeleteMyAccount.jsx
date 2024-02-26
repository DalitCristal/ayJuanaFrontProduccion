import PropTypes from "prop-types";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCookiesByName } from "../../utils/formsUtils";
import { HOST } from "../../config/config";
import Swal from "sweetalert2";
import "./DeleteMyAccount.css";
import { getUserRole } from "../ProtectedRoute/rolDelUsuario";

const DeleteMyAccount = () => {
  const { userId } = useParams();
  const [confirmation, setConfirmation] = useState(false);

  const navigate = useNavigate();
  const userRole = getUserRole();

  const handleDeleteAccount = async () => {
    try {
      const token = getCookiesByName("jwtCookie");
      const { user: tokenUser } = JSON.parse(atob(token.split(".")[1]));

      if (userId !== tokenUser._id) {
        Swal.fire({
          title: `Acceso no autorizado`,
          icon: "info",
          showConfirmButton: false,
          timer: 2000,
        });

        navigate("/");

        return;
      }
      const response = await fetch(`${HOST}/api/users/${userId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          rol: userRole,
        },
        credentials: "include",
      });

      const deleteCookie = (name) => {
        document.cookie = getCookiesByName(name);
      };

      if (response.status === 200) {
        const data = await response.json();
        Swal.fire({
          title: `Cuenta eliminada exitosamente ${data.first_name} `,
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });

        deleteCookie("jwtCookie");

        navigate("/register");
      } else {
        const data = await response.json();
        Swal.fire({
          title: `Error al eliminar la cuenta: ${data.mensaje} `,
          icon: "error",
          showConfirmButton: false,
          timer: 2000,
        });
      }
    } catch (error) {
      console.error(`Error inesperado al eliminar la cuenta, ${error}`);
    }
  };

  const handleConfirmation = () => {
    setConfirmation(true);
  };

  const handleCancel = () => {
    setConfirmation(false);
    const token = getCookiesByName("jwtCookie");
    const { user } = JSON.parse(atob(token.split(".")[1]));
    navigate(`/profile/${user._id}`);
  };

  return (
    <>
      <div className="deleteAccountContainer">
        {confirmation ? (
          <>
            <p className="confirmationMessage">
              ¿Estás seguro de eliminar tu cuenta? Esta acción no se puede
              deshacer.
            </p>
            <button onClick={handleDeleteAccount} className="deleteButton">
              Sí, eliminar
            </button>
            <button onClick={handleCancel} className="cancelButton">
              Cancelar
            </button>
          </>
        ) : (
          <button
            onClick={handleConfirmation}
            className="buttonDeleteMyAccount"
          >
            Eliminar mi cuenta
          </button>
        )}
      </div>
    </>
  );
};

DeleteMyAccount.propTypes = {
  userId: PropTypes.string,
};

export default DeleteMyAccount;
