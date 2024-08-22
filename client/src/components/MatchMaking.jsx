import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import connexion from "../services/connexion";
import { useLogin } from "../context/LoginContext";
import "../styles/match-making.css";

Modal.setAppElement("#root");

function MatchMaking() {
  const [games, setGames] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newGameTitle, setNewGameTitle] = useState("");
  const [newGameMaxPlayers, setNewGameMaxPlayers] = useState(2);
  const { user } = useLogin();
  const navigate = useNavigate();

  useEffect(() => {
    connexion
      .get("api/games")
      .then((response) => {
        setGames(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the games!", error);
      });
  }, []);

  const handleJoinGame = (id) => {
    connexion
      .post(`api/games/join/${id}`)
      .then(() => {
        setGames((prevGames) =>
          prevGames.map((game) =>
            game.id === id
              ? { ...game, player_ingame: game.player_ingame + 1 }
              : game
          )
        );
        navigate(`/matchmaking/${id}`);
      })
      .catch((error) => {
        console.error("Error joining the game:", error);
      });
  };

  const handleCreateGame = () => {
    if (!user.userId) {
      alert("You must be logged in to create a game.");
      return;
    }

    connexion
      .post("api/games", {
        title: newGameTitle,
        player_ingame: 1, // Include the creator as a player
        player_max: newGameMaxPlayers,
        owner: user.userId,
        // Assign the user ID as the owner of the game
      })
      .then(() => connexion.get("api/games"))
      .then((response) => {
        setGames(response.data);
        setIsModalOpen(false);
        setNewGameTitle("");
        setNewGameMaxPlayers(2);
      })
      .catch((error) => {
        console.error("Error creating the game:", error);
      });
  };

  return (
    <div className="matchmaking">
      <div className="marge-button">
        <h1>Matchmaking</h1>
        <button type="button" onClick={() => setIsModalOpen(true)}>
          Create New Game
        </button>
      </div>
      {Array.isArray(games) && games.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Players</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {games.map((game) => (
              <tr key={game.id}>
                <td>{game.title}</td>
                <td>
                  {game.player_ingame}/{game.player_max}
                </td>
                <td>
                  <button
                    type="button"
                    onClick={() => handleJoinGame(game.id)}
                    disabled={game.player_ingame >= game.player_max}
                  >
                    Join
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No games available</p>
      )}

      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Create New Game"
        className="modal"
        overlayClassName="overlay"
      >
        <h2>Create New Game</h2>
        <form>
          <label>
            Title:
            <input
              type="text"
              value={newGameTitle}
              onChange={(e) => setNewGameTitle(e.target.value)}
            />
          </label>
          <label>
            Max Players:
            <input
              type="number"
              value={newGameMaxPlayers}
              onChange={(e) => setNewGameMaxPlayers(Number(e.target.value))}
              min="2"
            />
          </label>
          <button
            type="button"
            onClick={handleCreateGame}
            disabled={!newGameTitle || newGameMaxPlayers < 2}
          >
            Create Game
          </button>
          <button
            type="button"
            onClick={() => setIsModalOpen(false)}
            className="close"
          >
            Close
          </button>
        </form>
      </Modal>
    </div>
  );
}

export default MatchMaking;
