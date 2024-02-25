import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getCookiesByName } from "../../utils/formsUtils";
import "./DeleteUser.css";
import { HOST } from "../../config/config";
import Swal from "sweetalert2";

const DeleteUser = () => {
  const { userId } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    try {
      setLoading(true);
      const token = getCookiesByName("jwtCookie");

      const response = await fetch(`${HOST}/api/users/${userId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
      });

      if (response.status === 200) {
        const responseData = await response.json();
        Swal.fire({
          title: `Se elimino correctamente, ${responseData} `,
          icon: "error",
          showConfirmButton: false,
          timer: 1500,
        });

        navigate("/users");
      } else {
        const errorData = await response.json();
        Swal.fire({
          title: `Error al eliminar el usuario: ${errorData} `,
          icon: "error",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      console.error(`Error en la solicitud, ${error}`);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate("/users");
  };

  return (
    <>
      <div className="delete-user-container">
        <h1>Eliminar Usuario</h1>
        <p>
          ¿Estás seguro que deseas eliminar este usuario? Esta acción no se
          puede deshacer.
        </p>
        <div className="buttons-container">
          <button
            onClick={handleDelete}
            disabled={loading}
            className="delete-button"
          >
            {loading ? "Eliminando..." : "Eliminar Usuario"}
          </button>
          <button onClick={handleCancel} className="cancel-button">
            Cancelar
          </button>
        </div>
      </div>
    </>
  );
};

export default DeleteUser;
