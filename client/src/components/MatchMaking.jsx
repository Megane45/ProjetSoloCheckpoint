import { useEffect, useState } from "react";
import connexion from "../services/connexion";
import "../styles/match-making.css";

function MatchMaking() {
  const [games, setGames] = useState([]);

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

  // Fonction pour rejoindre un jeu
  const handleJoinGame = (id) => {
    connexion
      .post(`api/games/${id}`)
      .then((response) => {
        setGames(response.data);
      })
      .catch((error) => {
        console.error("Error joining the game:", error);
      });
  };

  return (
    <div className="matchmaking">
      <h1>Matchmaking</h1>
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
                    Rejoindre
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No games available</p>
      )}
    </div>
  );
}

export default MatchMaking;
