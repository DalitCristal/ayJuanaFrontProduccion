import { createContext, useState } from "react";
import PropTypes from "prop-types";

export const LoggerContext = createContext({
  logger: [],
});

export const LoggerProvider = ({ children }) => {
  const [logs, setLogs] = useState([]);

  const addLog = (log) => {
    setLogs([...logs, log]);
  };

  return (
    <LoggerContext.Provider value={{ logs, addLog }}>
      {children}
    </LoggerContext.Provider>
  );
};

LoggerProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
