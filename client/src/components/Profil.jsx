import { useState, useEffect } from "react";
import connexion from "../services/connexion";
import { useLogin } from "../context/LoginContext";
import Modal from "./modal";
import "../styles/profil.css";

// Fonction pour sauvegarder les informations du profil dans le local storage
const saveProfileToLocalStorage = (profile) => {
  localStorage.setItem("userProfile", JSON.stringify(profile));
};

// Fonction pour charger les informations du profil depuis le local storage
const loadProfileFromLocalStorage = () => {
  const profile = localStorage.getItem("userProfile");
  return profile ? JSON.parse(profile) : null;
};

function Profil() {
  const { user } = useLogin();
  const [userProfil, setUserProfil] = useState({
    pseudo: "",
    email: "",
    profileImage: "", // Nouvelle propriété pour l'image de profil
  });
  const [gameProfil, setGameProfil] = useState([]);
  const [characterProfil, setCharacterProfil] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({});
  const [imagePreview, setImagePreview] = useState(null); // Prévisualisation de l'image
  const [imageFile, setImageFile] = useState(null); // Fichier d'image à télécharger

  useEffect(() => {
    const id = user.userId;

    // Charger les informations depuis le local storage
    const storedProfile = loadProfileFromLocalStorage();
    if (storedProfile) {
      setUserProfil(storedProfile);
    } else {
      // Si les informations ne sont pas dans le local storage, les récupérer depuis l'API
      connexion
        .get(`api/profil/user/${id}`)
        .then((response) => {
          setUserProfil(response.data);
          saveProfileToLocalStorage(response.data); // Sauvegarder dans le local storage
        })
        .catch((error) => {
          console.error("Erreur lors de la récupération du profil :", error);
        });
    }

    connexion
      .get(`api/profil/games/${id}`)
      .then((response) => {
        setGameProfil(response.data);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des jeux :", error);
      });

    connexion
      .get(`api/profil/character/${id}`)
      .then((response) => {
        setCharacterProfil(response.data);
      })
      .catch((error) => {
        console.error(
          "Erreur lors de la récupération des personnages :",
          error
        );
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

  // Gestion de l'upload de l'image
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setImageFile(file);

    // Prévisualisation de l'image
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSaveImage = () => {
    if (imageFile) {
      const formData = new FormData();
      formData.append("profileImage", imageFile);

      connexion
        .post("api/profil/updateImage", formData)
        .then((response) => {
          // Mettre à jour le profil avec la nouvelle image
          const updatedProfile = {
            ...userProfil,
            profileImage: response.data.profileImage,
          };
          setUserProfil(updatedProfile);
          // Sauvegarder les modifications dans le local storage
          saveProfileToLocalStorage(updatedProfile);
        })
        .catch((error) => {
          console.error("Erreur lors de la sauvegarde de l'image :", error);
        });
    }
  };

  return (
    <div className="profil-container">
      <h1>Profil de {userProfil.pseudo}</h1>
      <p>Email : {userProfil.email}</p>

      <div className="profile-image-section">
        <h2>Image de profil</h2>
        {userProfil.profileImage ? (
          <img
            src={userProfil.profileImage}
            alt="Profil"
            className="profile-image"
          />
        ) : (
          <p>Aucune image de profil</p>
        )}
        <input type="file" accept="image/*" onChange={handleImageUpload} />
        {imagePreview && (
          <div className="image-preview">
            <img src={imagePreview} alt="Aperçu" className="preview-image" />
            <button type="button" onClick={handleSaveImage}>
              Sauvegarder l'image
            </button>
          </div>
        )}
      </div>

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
