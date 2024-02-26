import { useState, useEffect } from "react";
import { getCookiesByName } from "../../utils/formsUtils";
import { HOST } from "../../config/config";
import UsersList from "./UsersList";
import "./usersStyles.css";
import Swal from "sweetalert2";
import { getUserRole } from "../ProtectedRoute/rolDelUsuario";

const UsersListContainer = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const userRole = getUserRole();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = getCookiesByName("jwtCookie");

        const response = await fetch(`${HOST}/api/users`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            rol: userRole,
          },
          credentials: "include",
        });

        if (response.status === 200) {
          const data = await response.json();
          setUsers(data.mensaje);
        } else {
          Swal.fire({
            title: `Error al obtener usuarios: ${response.statusText} `,
            icon: "error",
            showConfirmButton: false,
            timer: 2000,
          });
        }
      } catch (error) {
        console.error(`Error en la solicitud, ${error}`);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [userRole]);

  const handleSelectUser = (userId) => {
    if (selectedUsers.includes(userId)) {
      setSelectedUsers(selectedUsers.filter((id) => id !== userId));
    } else {
      setSelectedUsers([...selectedUsers, userId]);
    }
  };

  const handleDeleteSelectedUsers = async () => {
    if (!selectedUsers || selectedUsers.length === 0) {
      return;
    }
    setShowConfirmation(true);
  };

  const confirmDelete = async () => {
    try {
      const token = getCookiesByName("jwtCookie");

      // Construye la URL con los IDs de los usuarios a eliminar como parámetros de consulta
      const url = new URL(`${HOST}/api/users`);
      selectedUsers.forEach((userId) => {
        url.searchParams.append("userId", userId);
      });

      const response = await fetch(url.toString(), {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          rol: userRole,
        },
        credentials: "include",
      });

      if (response.status === 200) {
        // Actualiza la lista de usuarios después de eliminar los seleccionados
        setUsers(users.filter((user) => !selectedUsers.includes(user._id)));

        setSelectedUsers([]);
        setShowConfirmation(false);

        Swal.fire({
          title: `Usuarios eliminados exitosamente.`,
          icon: "success",
          showConfirmButton: false,
          timer: 2000,
        });
      } else {
        Swal.fire({
          title: `Error al eliminar usuarios: ${response.statusText} `,
          icon: "error",
          showConfirmButton: false,
          timer: 2000,
        });
      }
    } catch (error) {
      console.error(`Error en la solicitud, ${error}`);
    }
  };

  const cancelDelete = () => {
    setShowConfirmation(false);
  };

  return (
    <>
      <div className="container">
        <h1>Lista de Usuarios</h1>
        {loading ? (
          <p>Cargando...</p>
        ) : (
          <>
            <button
              onClick={handleDeleteSelectedUsers}
              className="deleteButton"
            >
              Eliminar Usuarios Seleccionados
            </button>
            {showConfirmation && (
              <div className="confirmationModal">
                <p>¿Estás seguro de eliminar estos usuarios?</p>
                <button onClick={confirmDelete} className="deleteButton">
                  Sí
                </button>
                <button onClick={cancelDelete} className="cancelButton">
                  Cancelar
                </button>
              </div>
            )}
            <UsersList
              users={users}
              selectedUsers={selectedUsers}
              onSelect={handleSelectUser}
            />
          </>
        )}
      </div>
    </>
  );
};

export default UsersListContainer;
