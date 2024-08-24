import { useState, useEffect } from "react";
import connexion from "../services/connexion";
import ModalSpells from "./modalSpells";

// eslint-disable-next-line react/prop-types
function SpellList({ characterId }) {
  const [spells, setSpells] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentSpell, setCurrentSpell] = useState(null);

  useEffect(() => {
    connexion
      .get(`api/spells/${characterId}`)
      .then((response) => {
        setSpells(response.data);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des sorts:", error);
      });
  }, [characterId]);

  const handleAddSpell = (newSpell) => {
    connexion
      .post("api/addspells", {
        spellID: newSpell.id,
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

  const handleEditSpell = (updatedSpell) => {
    if (!updatedSpell || !updatedSpell.id) {
      console.error("L'ID du sort est manquant ou invalide.");
      return;
    }

    connexion
      .put("api/spells/", {
        spellID: updatedSpell.id,
        spell_title: updatedSpell.title,
        spell_description: updatedSpell.description,
      })
      .then((response) => {
        if (response.status === 200) {
          setSpells(
            spells.map((spell) =>
              spell.id === updatedSpell.id
                ? response.data // Replace the spell with the updated one
                : spell
            )
          );
          setIsModalOpen(false);
          setCurrentSpell(null);
        } else {
          console.error(
            "Erreur lors de la mise à jour du sort: ",
            response.statusText
          );
        }
      })
      .catch((error) => {
        console.error("Erreur lors de la mise à jour du sort:", error);
      });
  };

  const openAddModal = () => {
    setCurrentSpell(null);
    setIsModalOpen(true);
  };

  const openEditModal = (spell) => {
    setCurrentSpell(spell);
    setIsModalOpen(true);
  };

  return (
    <div>
      <h2>Liste des sorts</h2>
      <button type="button" onClick={openAddModal}>
        Ajouter un sort
      </button>
      <ul>
        {spells.map((spell) => (
          <li key={spell.id}>
            <h3>{spell.spell_title}</h3>
            <p>{spell.spell_description}</p>
            <button type="button" onClick={() => openEditModal(spell)}>
              Éditer
            </button>
          </li>
        ))}
      </ul>
      <ModalSpells
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setCurrentSpell(null);
        }}
        onSave={currentSpell ? handleEditSpell : handleAddSpell}
        spell={currentSpell}
      />
    </div>
  );
}

export default SpellList;
