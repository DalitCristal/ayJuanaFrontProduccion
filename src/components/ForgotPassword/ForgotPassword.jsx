import { useState } from "react";
import { HOST } from "../../config/config";
import "./ForgotPassword.css";
import Swal from "sweetalert2";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleForgotPassword = async () => {
    try {
      setLoading(true);

      const response = await fetch(`${HOST}/api/users/mail`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (!response.status === 200) {
        Swal.fire({
          title: ` Hubo un problema al enviar el correo electrónico.   Intente más tarde.`,
          icon: "warning",
          showConfirmButton: false,
          timer: 2000,
        });
      }

      const data = await response.json();
      document.cookie = `token=${data.mensaje}; max-age=${
        +1 * 60 * 60 * 1000
      }; path=/; samesite=strict`;

      Swal.fire({
        title: `Se ha enviado un correo electrónico con instrucciones.`,
        icon: "info",
        showConfirmButton: false,
        timer: 2000,
      });
    } catch (error) {
      Swal.fire({
        title: `Hubo un error en el proceso, ${error} `,
        icon: "error",
        showConfirmButton: false,
        timer: 2000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="containerForgotPassword">
        <h1 className="titleForgotPassword">Recuperar Contraseña</h1>
        <p className="parrafoForgotPassword">
          Ingrese su correo electrónico y le enviaremos instrucciones para
          restablecer su contraseña.
        </p>

        <label className="labelForgotPassword">
          Correo Electrónico:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="inputForgotPassword"
          />
        </label>

        <button
          onClick={handleForgotPassword}
          disabled={loading}
          className="btnForgotPassword"
        >
          Enviar Correo Electrónico
        </button>
      </div>
    </>
  );
};

export default ForgotPassword;
