import { useState, useEffect } from "react";
import connexion from "../services/connexion";
import ModalSpells from "./modalSpells"; // Ensure the path is correct

// eslint-disable-next-line react/prop-types
function SpellList({ characterId }) {
  const [spells, setSpells] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    connexion
      .get(`api/spells/${characterId}`)
      .then((response) => {
        setSpells(response.data);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des sorts:", error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAddSpell = (newSpell) => {
    connexion
      .post("api/addspells", {
        character_id: characterId,
        spell_title: newSpell.title,
        spell_description: newSpell.description,
      })
      .then((response) => {
        setSpells([...spells, response.data]);
        setIsModalOpen(false);
      })
      .catch((error) => {
        console.error("Erreur lors de l'ajout du sort:", error);
      });
  };

  return (
    <div>
      <h2>Liste des sorts</h2>
      <button type="button" onClick={() => setIsModalOpen(true)}>
        Ajouter un sort
      </button>
      <ul>
        {spells.map((spell) => (
          <li key={spell.id}>
            <h3>{spell.spell_title}</h3>
            <p>{spell.spell_description}</p>
          </li>
        ))}
      </ul>
      <ModalSpells
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleAddSpell}
      />
    </div>
  );
}

export default SpellList;
