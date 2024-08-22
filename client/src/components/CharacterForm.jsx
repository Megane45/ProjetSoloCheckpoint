import { useState } from "react";
import connexion from "../services/connexion";
// import { useLogin } from "../context/LoginContext";
import "../styles/character-form.css";
import DiceSet from "./Dices";

function CharacterForm() {
  // const { user } = useLogin();
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

    try {
      await connexion.post("api/characters", character);

      setSuccess("Personnage enregistré avec succès !");
      setError(null);
    } catch (err) {
      console.error("Submission error:", err);
      setError("Erreur lors de l'enregistrement du personnage.");
    }
  };

  const maxStatValue = 20;

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
              onChange={handleChange}
            />
          </div>
          <div className="form-input-group">
            <label htmlFor="race">Race:</label>
            <select
              id="race"
              name="race"
              value={character.race || ""}
              onChange={handleChange}
            >
              <option value="">Sélectionner une race</option>
              <option value="human">Humain</option>
              <option value="elf">Elfe</option>
              <option value="dwarf">Nain</option>
              <option value="orc">Orc</option>
            </select>
          </div>

          <div className="stat-distribution">
            <p>Points restants : {pointsLeft}</p>
            {Object.keys(character.stats).map((statName) => {
              const statValue = character.stats[statName] || 0;

              return (
                <div key={statName} className="stat-input-group">
                  <label htmlFor={statName}>
                    {statName.replace("stat_", "")} ({statValue})
                  </label>
                  <input
                    type="range"
                    id={statName}
                    name={statName}
                    min="0"
                    max={maxStatValue}
                    value={statValue}
                    onChange={handleStatChange}
                  />
                </div>
              );
            })}
          </div>

          <div className="form-input-group">
            <label htmlFor="pv">PV:</label>
            <input
              type="number"
              id="pv"
              name="pv"
              value={character.pv || ""}
              onChange={handleChange}
              min="0"
              max="10000"
            />
          </div>

          <div className="form-input-group">
            <label htmlFor="mana">Mana:</label>
            <input
              type="number"
              id="mana"
              name="mana"
              value={character.mana || ""}
              onChange={handleChange}
              min="0"
              max="10000"
            />
          </div>

          <div className="form-input-group">
            <label htmlFor="status">Statut:</label>
            <select
              id="status"
              name="status"
              value={character.status || ""}
              onChange={handleChange}
            >
              <option value="">Sélectionner un statut</option>
              <option value="vivant">Vivant</option>
              <option value="mort">Mort</option>
            </select>
          </div>

          <div className="register-button">
            <button type="submit" className="button">
              Enregistrer
            </button>
          </div>
        </form>

        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}
      </div>
      <DiceSet />;
    </div>
  );
}

export default CharacterForm;
