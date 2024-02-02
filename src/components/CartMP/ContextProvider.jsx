import { createContext } from "react";
import PropTypes from "prop-types";

const Context = createContext({});
const InternalProvider = ({ children, context }) => {
  return <Context.Provider value={context}>{children}</Context.Provider>;
};

InternalProvider.propTypes = {
  children: PropTypes.node.isRequired,
  context: PropTypes.object.isRequired,
};

export default InternalProvider;
export { Context };
