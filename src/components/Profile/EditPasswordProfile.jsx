import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { HOST } from "../../config/config";
import Swal from "sweetalert2";
import "./editProfile.css";

const EditPasswordProfile = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [tokenValid, setTokenValid] = useState(true);
  const navigate = useNavigate();
  const { userId } = useParams();

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  useEffect(() => {
    const validateResetToken = async () => {
      try {
        const token = document.cookie.replace("token=", "");

        const response = await fetch(
          `${HOST}/api/validate-reset-token/${userId}`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
            },
            credentials: "include",
          }
        );

        if (!response.status === 200) {
          setTokenValid(false);
        }
      } catch (error) {
        Swal.fire({
          title: `Error al validar credenciales, ${error} `,
          icon: "error",
          showConfirmButton: false,
          timer: 2000,
        });

        setTokenValid(false);
      }
    };

    validateResetToken();
  }, [userId]);

  const handleSavePassword = async (e) => {
    e.preventDefault();

    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    try {
      const response = await fetch(`${HOST}/api/users/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });

      if (response.status === 200) {
        Swal.fire({
          title: `Contraseña actualizada exitosamente `,
          icon: "error",
          showConfirmButton: false,
          timer: 1500,
        });

        navigate("/login");
      } else {
        const data = await response.json();
        setError(data.mensaje || "Error al cambiar la contraseña");
      }
    } catch (error) {
      setError("Error de red");
    }
  };

  return (
    <>
      <div className="containerEditProfile">
        <h1 className="titleEditProfile">Cambiar Contraseña</h1>
        {tokenValid ? (
          <form onSubmit={handleSavePassword} className="formEditProfile">
            <label className="labelEditProfile">
              Nueva Contraseña:
              <input
                type="password"
                name="password"
                value={password}
                onChange={handlePasswordChange}
                className="inputEditProfile"
              />
            </label>

            <label className="labelEditProfile">
              Confirmar Contraseña:
              <input
                type="password"
                name="confirmPassword"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                className="inputEditProfile"
              />
            </label>

            <button type="submit" className="btnEditProfile">
              Guardar Contraseña
            </button>

            {error && <p className="errorEditProfile">{error}</p>}
          </form>
        ) : (
          <div>
            <p>
              El enlace ha expirado. Por favor, genera un nuevo correo de
              restablecimiento.
            </p>
            <button
              onClick={() => navigate("/login/forgot-password")}
              className="btnForgotPassword"
            >
              Generar nuevo correo de restablecimiento
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default EditPasswordProfile;
