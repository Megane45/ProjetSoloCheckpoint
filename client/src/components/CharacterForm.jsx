import { useState } from "react";
import connexion from "../services/connexion";
import { useLogin } from "../context/LoginContext";
import "../styles/character-form.css";
import DiceSet from "./Dices";
import Socketio from "./Socketio";
import Spells from "./Spells";

function CharacterForm() {
  const { user } = useLogin();
  const [character, setCharacter] = useState({
    stats: {
      stat_force: 0,
      stat_agilite: 0,
      stat_sagesse: 0,
      stat_charisme: 0,
    },
    pv: 100,
    mana: 100,
    name: "",
    race: "",
    status: "",
    createdCharacterID: -1,
  });

  const [pointsLeft, setPointsLeft] = useState(20);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCharacter((prevCharacter) => ({
      ...prevCharacter,
      [name]: value,
    }));
  };

  const handleStatChange = (e) => {
    const { name, value } = e.target;
    const newValue = parseInt(value, 10);

    if (Number.isNaN(newValue) || newValue < 0) return;

    const updatedStats = { ...character.stats, [name]: newValue };
    const totalPoints = Object.values(updatedStats).reduce(
      (sum, stat) => sum + stat,
      0
    );

    if (totalPoints <= 20) {
      setCharacter((prevCharacter) => ({
        ...prevCharacter,
        stats: updatedStats,
      }));
      setPointsLeft(20 - totalPoints);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!character.name || !character.race || !character.status) {
      setError("Veuillez remplir tous les champs obligatoires.");
      return;
    }
    const characterToSubmit = {
      ...character,
      user_id: user.id,
    };
    try {
      await connexion
        .post("api/characters", characterToSubmit)
        .then((response) => setCharacter(response.data));
      setSuccess("Personnage enregistré avec succès !");
      setError(null);
    } catch (err) {
      console.error("Submission error:", err);
      setError("Erreur lors de l'enregistrement du personnage.");
    }
  };

  const maxStatValue = 20;

  return (
    <div className="character-form-container">
      <div className="character-form-box">
        <h2 className="character-form-title">Formulaire de personnage</h2>
        <form onSubmit={handleSubmit} className="character-form">
          <div className="character-form-group">
            <label htmlFor="name" className="character-form-label">
              Nom:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={character.name || ""}
              onChange={handleChange}
              className="character-form-input"
            />
          </div>
          <div className="character-form-group">
            <label htmlFor="race" className="character-form-label">
              Race:
            </label>
            <select
              id="race"
              name="race"
              value={character.race || ""}
              onChange={handleChange}
              className="character-form-select"
            >
              <option value="">Sélectionner une race</option>
              <option value="human">Humain</option>
              <option value="elf">Elfe</option>
              <option value="dwarf">Nain</option>
              <option value="orc">Orc</option>
            </select>
          </div>

          <div className="stat-distribution">
            <p className="stat-distribution-text">
              Points restants : {pointsLeft}
            </p>
            {Object.keys(character.stats).map((statName) => {
              const statValue = character.stats[statName] || 0;

              return (
                <div key={statName} className="stat-input-group">
                  <label htmlFor={statName} className="stat-label">
                    {statName.replace("stat_", "").toUpperCase()} ({statValue})
                  </label>
                  <input
                    type="range"
                    id={statName}
                    name={statName}
                    min="0"
                    max={maxStatValue}
                    value={statValue}
                    onChange={handleStatChange}
                    className="stat-input"
                  />
                </div>
              );
            })}
          </div>

          <div className="character-form-group">
            <label htmlFor="pv" className="character-form-label">
              PV:
            </label>
            <input
              type="number"
              id="pv"
              name="pv"
              value={character.pv || ""}
              onChange={handleChange}
              min="0"
              max="10000"
              className="character-form-input"
            />
          </div>

          <div className="character-form-group">
            <label htmlFor="mana" className="character-form-label">
              Mana:
            </label>
            <input
              type="number"
              id="mana"
              name="mana"
              value={character.mana || ""}
              onChange={handleChange}
              min="0"
              max="10000"
              className="character-form-input"
            />
          </div>

          <div className="character-form-group">
            <label htmlFor="status" className="character-form-label">
              Statut:
            </label>
            <select
              id="status"
              name="status"
              value={character.status || ""}
              onChange={handleChange}
              className="character-form-select"
            >
              <option value="">Sélectionner un statut</option>
              <option value="vivant">Vivant</option>
              <option value="mort">Mort</option>
            </select>
          </div>

          <div className="character-form-submit">
            <button type="submit" className="submit-button">
              Enregistrer
            </button>
          </div>
        </form>

        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}
      </div>
      <DiceSet className="dice-set" />
      {character.createdCharacterID > -1 && (
        <Spells characterId={character.createdCharacterID} />
      )}
      <Socketio className="socketio-component" />
    </div>
  );
}

export default CharacterForm;
