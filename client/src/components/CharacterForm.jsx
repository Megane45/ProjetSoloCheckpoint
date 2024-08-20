import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import "../styles/character-form.css"; // Assurez-vous que le chemin est correct

function CharacterForm({ characterId, onSave }) {
  const [character, setCharacter] = useState({
    statForce: 0,
    statAgilite: 0,
    statSagesse: 0,
    statCharisme: 0,
  });
  const [validationErrors, setValidationErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [pointsLeft, setPointsLeft] = useState(20);

  useEffect(() => {
    if (characterId) {
      axios
        .get(`/api/characters/${characterId}`)
        .then((response) => {
          const { statForce, statAgilite, statSagesse, statCharisme } =
            response.data;
          const totalPoints =
            statForce + statAgilite + statSagesse + statCharisme;
          setCharacter(response.data);
          setPointsLeft(20 - totalPoints);
        })
        .catch((error) => {
          console.error("Erreur lors de la récupération des données :", error);
        });
    }
  }, [characterId]);

  const handleStatChange = (e) => {
    const { name, value } = e.target;
    const newValue = parseInt(value, 10);
    const newTotal =
      newValue +
      character.statForce +
      character.statAgilite +
      character.statSagesse +
      character.statCharisme -
      character[name];

    if (newTotal <= 20) {
      setCharacter((prevCharacter) => ({
        ...prevCharacter,
        [name]: newValue,
      }));
      setPointsLeft(20 - newTotal);
    }
  };

  const validateForm = () => {
    const errors = {};
    const requiredFields = ["name", "race", "pv", "mana", "status"];

    requiredFields.forEach((field) => {
      if (!character[field] || character[field] === "") {
        errors[field] = "Ce champ est requis";
      }
    });

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSave(character);
      setSuccess(true);
      setValidationErrors({});
    } else {
      setSuccess(false);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h2 className="signup-title">Formulaire de personnage</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-input-group">
            <label htmlFor="name">Nom:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={character.name || ""}
              onChange={(e) =>
                setCharacter({ ...character, name: e.target.value })
              }
            />
            {validationErrors.name && (
              <span className="error-message">{validationErrors.name}</span>
            )}
          </div>

          {/* Répétez les autres champs ici */}
          <div className="form-input-group">
            <label htmlFor="race">Race:</label>
            <select
              id="race"
              name="race"
              value={character.race || ""}
              onChange={(e) =>
                setCharacter({ ...character, race: e.target.value })
              }
            >
              <option value="">Sélectionner une race</option>
              <option value="human">Humain</option>
              <option value="elf">Elfe</option>
              <option value="dwarf">Nain</option>
              <option value="orc">Orc</option>
            </select>
            {validationErrors.race && (
              <span className="error-message">{validationErrors.race}</span>
            )}
          </div>

          <div className="stat-distribution">
            <p>Points restants : {pointsLeft}</p>

            <div className="form-input-group">
              <label htmlFor="statForce">Force: {character.statForce}</label>
              <input
                type="range"
                id="statForce"
                name="statForce"
                min="0"
                max="20"
                value={character.statForce || 0}
                onChange={handleStatChange}
              />
            </div>

            <div className="form-input-group">
              <label htmlFor="statAgilite">
                Agilité: {character.statAgilite}
              </label>
              <input
                type="range"
                id="statAgilite"
                name="statAgilite"
                min="0"
                max="20"
                value={character.statAgilite || 0}
                onChange={handleStatChange}
              />
            </div>

            <div className="form-input-group">
              <label htmlFor="statSagesse">
                Sagesse: {character.statSagesse}
              </label>
              <input
                type="range"
                id="statSagesse"
                name="statSagesse"
                min="0"
                max="20"
                value={character.statSagesse || 0}
                onChange={handleStatChange}
              />
            </div>

            <div className="form-input-group">
              <label htmlFor="statCharisme">
                Charisme: {character.statCharisme}
              </label>
              <input
                type="range"
                id="statCharisme"
                name="statCharisme"
                min="0"
                max="20"
                value={character.statCharisme || 0}
                onChange={handleStatChange}
              />
            </div>
          </div>

          <div className="form-input-group">
            <label htmlFor="pv">PV:</label>
            <input
              type="number"
              id="pv"
              name="pv"
              value={character.pv || ""}
              onChange={(e) =>
                setCharacter({ ...character, pv: e.target.value })
              }
              min="0"
              max="10000"
            />
            {validationErrors.pv && (
              <span className="error-message">{validationErrors.pv}</span>
            )}
          </div>

          <div className="form-input-group">
            <label htmlFor="mana">Mana:</label>
            <input
              type="number"
              id="mana"
              name="mana"
              value={character.mana || ""}
              onChange={(e) =>
                setCharacter({ ...character, mana: e.target.value })
              }
              min="0"
              max="10000"
            />
            {validationErrors.mana && (
              <span className="error-message">{validationErrors.mana}</span>
            )}
          </div>

          <div className="form-input-group">
            <label htmlFor="status">Statut:</label>
            <select
              id="status"
              name="status"
              value={character.status || ""}
              onChange={(e) =>
                setCharacter({ ...character, status: e.target.value })
              }
            >
              <option value="">Sélectionner un statut</option>
              <option value="active">Actif</option>
              <option value="inactive">Inactif</option>
              <option value="retired">Retraité</option>
            </select>
            {validationErrors.status && (
              <span className="error-message">{validationErrors.status}</span>
            )}
          </div>

          <div className="register-button">
            <button type="submit" className="button">
              Enregistrer
            </button>
          </div>

          {success && (
            <div className="success-message">
              Personnage enregistré avec succès!
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

CharacterForm.propTypes = {
  characterId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onSave: PropTypes.func.isRequired,
};

CharacterForm.defaultProps = {
  characterId: null,
};

export default CharacterForm;
