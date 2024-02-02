import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { validateForm } from "./ValidateForm.jsx";
import { HOST } from "../../config/config.js";
import Swal from "sweetalert2";
import "./Register.css";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    age: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const errorMessage = await validateForm(formData);

    if (errorMessage) {
      Swal.fire({
        title: `${errorMessage} `,
        icon: "warning",
        showConfirmButton: false,
        timer: 2500,
      });
      return;
    }

    try {
      const response = await fetch(`${HOST}/api/session/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.status === 201) {
        Swal.fire({
          title: `Usuario registrado exitosamente`,
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });

        navigate("/login");
      } else if (response.status === 401) {
        Swal.fire({
          title: "Email ya existente",
          icon: "warning",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        const responseData = await response.json();
        Swal.fire({
          title: `Error al registrar usuario: ${responseData.mensaje}`,
          icon: "error",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      Swal.fire({
        title: `Error inesperado al registrar usuario: ${error}`,
        icon: "success",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <>
      <div className="pageBox">
        <h1 className="titleFormu">Registro</h1>

        <form onSubmit={onSubmit} className="containerFormu">
          <input
            type="text"
            id="first_name"
            placeholder="Nombre"
            className="inputFormu"
            value={formData.first_name}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            id="last_name"
            placeholder="Apellido"
            className="inputFormu"
            value={formData.last_name}
            onChange={handleChange}
            required
          />

          <input
            type="number"
            id="age"
            placeholder="Edad"
            className="inputFormu"
            value={formData.age}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            id="email"
            placeholder="Correo Electrónico"
            className="inputFormu"
            value={formData.email}
            onChange={handleChange}
            pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
            required
          />
          <label className="labelPass">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="Contraseña"
              className="registerPass"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="showPasswordButton"
            >
              {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
            </button>
          </label>

          <label className="labelPass">
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              placeholder="Confirmar contraseña"
              className="registerPass"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="showPasswordButton"
            >
              {showConfirmPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
            </button>
          </label>

          <button type="submit" className="btnFormu">
            Registrarse
          </button>
        </form>
        <div className="pieFormLogin">
          <p>¿Ya tienes una cuenta?</p>

          <Link to={"/login"} className="linkFormu">
            Iniciar sesión
          </Link>
        </div>
      </div>
    </>
  );
};

export default Register;
