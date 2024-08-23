import { useState } from "react";
import "../styles/modal-spells.css";

// Modal component
// eslint-disable-next-line react/prop-types
function ModalSpells({ isOpen, onClose, onSave }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSave = () => {
    onSave({ title, description });
    setTitle("");
    setDescription("");
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Ajouter un nouveau sort</h2>
        <label>
          Titre:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <label>
          Description:
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        <button type="button" onClick={handleSave}>
          Enregistrer
        </button>
        <button type="button" onClick={onClose}>
          Annuler
        </button>
      </div>
    </div>
  );
}

export default ModalSpells;
