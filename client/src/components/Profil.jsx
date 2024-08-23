import { useState, useEffect } from "react";
import connexion from "../services/connexion";
import { useLogin } from "../context/LoginContext";
import Modal from "./modal";
import "../styles/profil.css";

function Profil() {
  const { user } = useLogin();
  const [userProfil, setUserProfil] = useState({
    pseudo: "",
    email: "",
  });
  const [gameProfil, setGameProfil] = useState([]);
  const [characterProfil, setCharacterProfil] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({});

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
      .get(`api/profil/character/${id}`)
      .then((response) => {
        setCharacterProfil(response.data);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération du profil :", error);
      });
  }, [user.userId]);

  const handleDeleteGame = (gameID) => {
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

  const handleDeleteCharacter = (characterID) => {
    connexion
      .delete(`api/characters/${characterID}`)
      .then(() => {
        setCharacterProfil((prevCharacters) =>
          prevCharacters.filter((character) => character.id !== characterID)
        );
      })
      .catch((error) => {
        console.error("Erreur lors de la suppression du personnage :", error);
      });
  };

  const handleOpenModal = (type, id) => {
    setModalData({ type, id });
    setShowModal(true);
  };

  const handleConfirmDelete = () => {
    if (modalData.type === "game") {
      handleDeleteGame(modalData.id);
    } else if (modalData.type === "character") {
      handleDeleteCharacter(modalData.id);
    }
    setShowModal(false);
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
              {character.name} - {character.race} - {character.status}
              <button
                type="button"
                onClick={() => handleOpenModal("character", character.id)}
              >
                Supprimer
              </button>
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
              {game.title} - {game.created_at}
              <button
                type="button"
                onClick={() => handleOpenModal("game", game.id)}
              >
                Supprimer
              </button>
            </li>
          ))
        ) : (
          <p>Aucune partie créée</p>
        )}
      </ul>

      {showModal && (
        <Modal
          message="Êtes-vous sûr de vouloir supprimer cet élément ?"
          onConfirm={handleConfirmDelete}
          onCancel={() => setShowModal(false)}
        />
      )}
    </div>
  );
}

export default Profil;
