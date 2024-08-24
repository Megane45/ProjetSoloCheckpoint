import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useLogin } from "../context/LoginContext";
import connexion from "../services/connexion";
import "../styles/socketio.css";

function Socketio() {
  const [messageList, setMessageList] = useState([]);
  const [newMessageText, setNewMessageText] = useState("");
  const [socket, setSocket] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [myProfil, setMyProfil] = useState({ user: "" });
  const { user } = useLogin();

  const ENDPOINT = "http://localhost:5050";

  useEffect(() => {
    // eslint-disable-next-line no-shadow
    const socket = io(ENDPOINT);

    setSocket(socket);

    socket.on("connect", () => {
      setCurrentUser(socket.id);
    });

    return () => {
      socket.emit("disconnectUser", socket.id);
      socket.off();
    };
  }, []);

  useEffect(() => {
    const id = user.userId;
    connexion
      .get(`api/profil/user/${id}`)
      .then((response) => {
        setMyProfil(response.data);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération du profil :", error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // OnUpdate
  useEffect(() => {
    if (socket) {
      socket.on("newMessage", (message) => {
        setMessageList([...messageList, message]);
      });
    }
  }, [messageList, socket]);

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit("sendMessage", {
      author: myProfil,
      text: newMessageText,
      id: currentUser,
    });
    setNewMessageText("");
  };

  return (
    <div className="socket-App">
      <h2>Messages</h2>

      <div className="socket-container">
        {messageList.map((message) => (
          <p
            key={message.id}
            className={message.id === currentUser ? "my-message" : "message"}
          >
            <strong>{myProfil.pseudo}</strong>: {message.text}
          </p>
        ))}
      </div>
      <form className="Send-box-form" onSubmit={handleSubmit}>
        <input
          className="socket-message"
          type="text"
          name="messageContent"
          placeholder="Ton message"
          value={newMessageText}
          required
          onChange={(e) => setNewMessageText(e.target.value)}
        />
        <input type="submit" value="Envoyer" />
      </form>
    </div>
  );
}

export default Socketio;
