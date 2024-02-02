import PropTypes from "prop-types";

const InputForm = ({ label, type, id, name, className, classNameLabel }) => {
  return (
    <label className={classNameLabel}>
      {label}
      <input type={type} id={id} name={name} className={className} required />
    </label>
  );
};

InputForm.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  classNameLabel: PropTypes.string.isRequired,
};

export default InputForm;
