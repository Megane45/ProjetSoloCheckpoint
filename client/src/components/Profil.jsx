import { useState, useEffect } from "react";
import connexion from "../services/connexion";
import { useLogin } from "../context/LoginContext";
import "../styles/profil.css";

function Profil() {
  const { user } = useLogin();
  const [userProfil, setUserProfil] = useState({
    pseudo: "",
    email: "",
  });
  const [gameProfil, setGameProfil] = useState({
    title: "",
    created_at: "",
  });
  const [characterProfil, setCharacterProfil] = useState({
    name: "",
    race: "",
    status: "",
  });

  useEffect(() => {
    const id = user.userId;
    connexion
      .get(`api/profil/user/${id}`)
      .then((response) => {
        setUserProfil(response.data);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération du profil :", error);
      });
    connexion
      .get(`api/profil/games/${id}`)
      .then((response) => {
        setGameProfil(response.data);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération du profil :", error);
      });
    connexion
      .get(`api/profil/character/${1}`)
      .then((response) => {
        setCharacterProfil(response.data);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération du profil :", error);
      });
  }, []);

  const handleDelete = (gameID) => {
    connexion
      .delete(`api/games/${gameID}`)
      .then(() => {
        setGameProfil((prevGames) =>
          prevGames.filter((game) => game.id !== gameID)
        );
      })
      .catch((error) => {
        console.error("Erreur lors de la suppression de la partie :", error);
      });
  };

  return (
    <div className="profil-container">
      <h1>Profil de {userProfil.pseudo}</h1>
      <p>Email : {userProfil.email}</p>

      <h2>Personnages créés</h2>
      <ul>
        {characterProfil.length > 0 ? (
          characterProfil.map((character) => (
            <li key={character.id}>
              {character.name}
              {character.race}
              {character.status}
            </li>
          ))
        ) : (
          <p>Aucun personnage créé</p>
        )}
      </ul>
      <h2>Parties créées</h2>
      <ul>
        {gameProfil.length > 0 ? (
          gameProfil.map((game) => (
            <li key={game.id}>
              {game.title}
              {game.created_at}
              <button type="button" onClick={() => handleDelete(game.id)}>
                Supprimer
              </button>
            </li>
          ))
        ) : (
          <p>Aucune partie créée</p>
        )}
      </ul>
    </div>
  );
}

export default Profil;
