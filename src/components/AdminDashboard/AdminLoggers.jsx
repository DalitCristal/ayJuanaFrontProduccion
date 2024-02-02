import PropTypes from "prop-types";

const AdminLoggers = ({ logs }) => {
  console.log("RECIBIENDO", logs);
  return (
    <>
      <div>AdminLoggers</div>
      <div>
        <h2>Registros del sistema</h2>
        <ul>{logs && logs.map((log, index) => <li key={index}>{log}</li>)}</ul>
      </div>
    </>
  );
};

AdminLoggers.propTypes = {
  logs: PropTypes.array.isRequired,
};

export default AdminLoggers;
