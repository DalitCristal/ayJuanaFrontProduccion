import { useState, useEffect, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import { getCookiesByName } from "../../utils/formsUtils.js";
import EditIcon from "@mui/icons-material/Edit";
import { HOST } from "../../config/config.js";
import "./Profile.css";
import Swal from "sweetalert2";

const Profile = () => {
  const { userId } = useParams();
  const [userData, setUserData] = useState(null);
  const [editableFields, setEditableFields] = useState({
    first_name: false,
    last_name: false,
    age: false,
    email: false,
    password: false,
  });

  // Nuevos estados para campos editables
  const [newFirstName, setNewFirstName] = useState("");
  const [newLastName, setNewLastName] = useState("");
  const [newAge, setAge] = useState("");
  const [newEmail, setEmail] = useState("");
  const [newPassword, setPassword] = useState("");

  const fetchProfile = useCallback(
    async (token) => {
      try {
        const response = await fetch(`${HOST}/api/users/${userId}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
        });

        if (response.status === 200) {
          const data = await response.json();
          setUserData(data.mensaje);
        } else {
          Swal.fire({
            title: `Error en la solicitud, ${response} `,
            icon: "error",
            showConfirmButton: false,
            timer: 2000,
          });
        }
      } catch (error) {
        Swal.fire({
          title: `Error en la solicitud, ${error} `,
          icon: "error",
          showConfirmButton: false,
          timer: 2000,
        });
      }
    },
    [userId, setUserData]
  );

  useEffect(() => {
    const token = getCookiesByName("jwtCookie");
    const { user } = JSON.parse(atob(token.split(".")[1]));

    if (user._id !== userId) {
      Swal.fire({
        title: `Acceso no autorizado `,
        icon: "error",
        showConfirmButton: false,
        timer: 2000,
      });

      return;
    }

    if (userId) {
      fetchProfile(token);
    }
  }, [userId, fetchProfile]);

  const handleEditField = (field) => {
    setEditableFields((prevFields) => ({ ...prevFields, [field]: true }));
    switch (field) {
      case "first_name":
        setNewFirstName(userData.first_name);
        break;
      case "last_name":
        setNewLastName(userData.last_name);
        break;
      case "age":
        setAge(userData.age);
        break;
      case "email":
        setEmail(userData.email);
        break;
      case "password":
        setPassword(userData.password);
        break;
      default:
        break;
    }
  };

  const handleSaveChanges = async () => {
    try {
      const token = getCookiesByName("jwtCookie");
      const updatedFields = {};

      // Agregar al objeto solo los campos que han sido editados
      if (editableFields.first_name) updatedFields.first_name = newFirstName;
      if (editableFields.last_name) updatedFields.last_name = newLastName;
      if (editableFields.age) updatedFields.age = newAge;
      if (editableFields.email) updatedFields.email = newEmail;
      if (editableFields.password) updatedFields.password = newPassword;

      const response = await fetch(`${HOST}/api/users/profile/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedFields),
        credentials: "include",
      });

      if (response.status === 200) {
        const data = await response.json();
        setUserData(data.mensaje);
        // Desactivar la edición para todos los campos
        setEditableFields({
          first_name: false,
          last_name: false,
          age: false,
          email: false,
          password: false,
        });
        Swal.fire({
          title: `Cambios guardados exitosamente.`,
          icon: "success",
          showConfirmButton: false,
          timer: 2000,
        });

        fetchProfile();
      } else {
        Swal.fire({
          title: `Error al guardar los cambios. Por favor, inténtalo de nuevo.`,
          icon: "error",
          showConfirmButton: false,
          timer: 2000,
        });
      }
    } catch (error) {
      Swal.fire({
        title: `Error inesperado. Por favor, inténtalo de nuevo más tarde. ${error} `,
        icon: "error",
        showConfirmButton: false,
        timer: 2000,
      });
    }
  };

  return (
    <>
      <div className="divContainerProfile">
        <h2 className="h2Profile">Mi perfil</h2>

        {userData ? (
          <div>
            <p>
              Nombre:
              {editableFields.first_name ? (
                <>
                  <input
                    type="text"
                    value={newFirstName}
                    onChange={(e) => setNewFirstName(e.target.value)}
                    className="inputProfile"
                  />
                  <EditIcon style={{ cursor: "pointer" }} />
                </>
              ) : (
                <span
                  onClick={() => handleEditField("first_name")}
                  className="spanProfile"
                >
                  {userData.first_name}
                  <EditIcon style={{ cursor: "pointer" }} />
                </span>
              )}
            </p>
            <p>
              Apellido:
              {editableFields.last_name ? (
                <>
                  <input
                    type="text"
                    value={newLastName}
                    onChange={(e) => setNewLastName(e.target.value)}
                    className="inputProfile"
                  />
                  <EditIcon style={{ cursor: "pointer" }} />
                </>
              ) : (
                <span
                  onClick={() => handleEditField("last_name")}
                  className="spanProfile"
                >
                  {userData.last_name}
                  <EditIcon style={{ cursor: "pointer" }} />
                </span>
              )}
            </p>
            <p>
              Edad:
              {editableFields.age ? (
                <>
                  <input
                    type="number"
                    value={newAge}
                    onChange={(e) => setAge(e.target.value)}
                    className="inputProfile"
                  />
                  <EditIcon style={{ cursor: "pointer" }} />
                </>
              ) : (
                <span
                  onClick={() => handleEditField("age")}
                  className="spanProfile"
                >
                  {userData.age}
                  <EditIcon style={{ cursor: "pointer" }} />
                </span>
              )}
            </p>
            <p>
              Email:
              {editableFields.email ? (
                <>
                  <input
                    type="text"
                    value={newEmail}
                    onChange={(e) => setEmail(e.target.value)}
                    className="inputProfile"
                  />
                  <EditIcon style={{ cursor: "pointer" }} />
                </>
              ) : (
                <span
                  onClick={() => handleEditField("email")}
                  className="spanProfile"
                >
                  {userData.email}
                  <EditIcon style={{ cursor: "pointer" }} />
                </span>
              )}
            </p>
            <p>
              Contraseña:
              {editableFields.password ? (
                <>
                  <input
                    type="text"
                    value={newPassword}
                    onChange={(e) => setPassword(e.target.value)}
                    className="inputProfile"
                  />
                  <EditIcon style={{ cursor: "pointer" }} />
                </>
              ) : (
                <span
                  onClick={() => handleEditField("password")}
                  className="spanProfile"
                >
                  {userData.password}
                  <EditIcon style={{ cursor: "pointer" }} />
                </span>
              )}
            </p>
            <button onClick={handleSaveChanges} className="buttonSaveChanges">
              Guardar cambios
            </button>
            <div>
              <Link to={`/profile/delete/${userId}`}>Eliminar mi cuenta</Link>
            </div>
          </div>
        ) : (
          <p className="pLoading">Cargando...</p>
        )}
      </div>
    </>
  );
};

export default Profile;
