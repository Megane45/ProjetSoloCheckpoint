import PropTypes from "prop-types";
import { FaTrash } from "react-icons/fa6";

function ButtonDeleteAdmin({ label, handleClick, id }) {
  return (
    <button type="button" className="button" onClick={() => handleClick(id)}>
      <FaTrash />
      {label}
    </button>
  );
}

ButtonDeleteAdmin.propTypes = {
  label: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
};

export default ButtonDeleteAdmin;
