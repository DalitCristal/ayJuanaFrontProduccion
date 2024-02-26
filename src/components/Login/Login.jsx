import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HOST } from "../../config/config";
import { getUserFirstName } from "../ProtectedRoute/rolDelUsuario";
import "../GlobalStyles/Formularios.css";
import Swal from "sweetalert2";
import "./Login.css";

const Login = () => {
  const formRef = useRef(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const datForm = new FormData(formRef.current);
    const data = Object.fromEntries(datForm);

    const response = await fetch(`${HOST}/api/session/signin`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.status === 200) {
      const datos = await response.json();
      const expirationDate = new Date(Date.now() + 24 * 60 * 60 * 1000);
      const cookieOptions = {
        expires: expirationDate.toUTCString(),
        path: "/",
        secure: true,
        sameSite: "strict",
      };
      document.cookie = `jwtCookie=${datos.token}; ${cookieOptions}`;
      console.log("document.cookie", document.cookie);
      const nameUser = getUserFirstName();
      Swal.fire({
        position: "top",
        title: `¡Hola ${nameUser}!`,
        showConfirmButton: false,
        timer: 1500,
      });

      navigate("/");
    } else if (response.status === 401) {
      console.error("Inicio de sesión fallido: Credenciales incorrectas");

      Swal.fire({
        title: `Correo electrónico o contraseña incorrecta`,
        icon: "warning",
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      console.error("Inicio de sesión fallido: error desconocido");
    }
  };

  return (
    <>
      <div className="pageBox">
        <h1 className="titleFormu">Iniciar sesión</h1>

        <form onSubmit={handleSubmit} ref={formRef} className="containerFormu">
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Correo Electrónico"
            className="inputFormu"
          />

          <input
            type="password"
            id="password"
            name="password"
            placeholder="Contraseña"
            className="inputFormu"
          />

          <button type="submit" className="btnFormu">
            Iniciar sesión
          </button>
        </form>
        <div className="pieFormLogin">
          <p>¿No tienes una cuenta aún?</p>
          <Link to={"/register"} className="linkFormu">
            Registrarse
          </Link>
          <p>
            <Link to="/login/forgot-password">Olvidé mi contraseña</Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
