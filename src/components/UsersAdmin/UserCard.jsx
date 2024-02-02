import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "./UserCard.css";

const UserCard = ({ user, isSelected, onSelect }) => {
  const { _id, first_name, last_name, email, rol, last_connection } = user;

  // Formatear la fecha
  const formatLastConnection = (dateTimeString) => {
    const dateTime = new Date(dateTimeString);
    const day = dateTime.getDate();
    const month = dateTime.getMonth() + 1;
    const year = dateTime.getFullYear();
    const hours = dateTime.getHours();
    const minutes = dateTime.getMinutes();
    const seconds = dateTime.getSeconds();

    const formattedDay = day < 10 ? `0${day}` : day;
    const formattedMonth = month < 10 ? `0${month}` : month;
    const formattedHours = hours < 10 ? `0${hours}` : hours;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

    return `${formattedDay}/${formattedMonth}/${year} ${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  };

  const isInactive = () => {
    const lastConnectionTime = new Date(last_connection).getTime();
    const currentTime = new Date().getTime();
    const minutesSinceLastConnection =
      (currentTime - lastConnectionTime) / (1000 * 60);
    return minutesSinceLastConnection > 48 * 60;
  };

  const handleSelect = () => {
    onSelect(_id);
  };

  return (
    <div
      className={`user-card ${isSelected ? "selected" : ""} ${
        isInactive() ? "inactive" : ""
      }`}
    >
      {isInactive() && <p className="inactive-message">Cuenta inactiva</p>}

      <p>
        <strong>Nombre: </strong>
        {first_name}
      </p>
      <p>
        <strong>Apellido:</strong> {last_name}
      </p>
      <p>
        <strong>Email: </strong>
        {email}
      </p>
      <p>
        <strong>Rol:</strong> {rol}
      </p>
      <Link to={`/users/edit/${_id}`}>Editar rol usuario</Link>
      <br />
      <hr></hr>
      <br />
      <>
        <p>
          {" "}
          <strong>Ultima conexión:</strong>{" "}
          {formatLastConnection(last_connection)}{" "}
        </p>
        <p>
          <strong> Eliminar usuario:{"   "}</strong>

          <input
            type="checkbox"
            checked={isSelected}
            onChange={handleSelect}
            className="custom-checkbox"
          />
        </p>
      </>
    </div>
  );
};

UserCard.propTypes = {
  user: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    first_name: PropTypes.string.isRequired,
    last_name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    rol: PropTypes.string.isRequired,
    last_connection: PropTypes.string.isRequired,
  }).isRequired,
  isSelected: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default UserCard;
