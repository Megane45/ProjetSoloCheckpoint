/* eslint-disable react/prop-types */

import { useState, useEffect } from "react";
import "../styles/modal-spells.css";

function ModalSpells({ isOpen, onClose, onSave, spell }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (spell) {
      setTitle(spell.spell_title);
      setDescription(spell.spell_description);
    } else {
      setTitle("");
      setDescription("");
    }
  }, [spell]);

  const handleSave = () => {
    if (spell) {
      onSave({ id: spell.id, title, description });
    } else {
      onSave({ title, description });
    }
    setTitle("");
    setDescription("");
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{spell ? "Modifier le sort" : "Ajouter un nouveau sort"}</h2>
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
