/* eslint-disable react/prop-types */
import "../styles/modal.css"; // Style pour la modal

function Modal({ message, onConfirm, onCancel }) {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <p>{message}</p>
        <div className="modal-actions">
          <button type="button" className="confirm-button" onClick={onConfirm}>
            Confirmer
          </button>
          <button type="button" className="cancel-button" onClick={onCancel}>
            Annuler
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
