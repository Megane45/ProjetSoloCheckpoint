import { useState, useEffect } from "react";
import io from "socket.io-client";
import { motion } from "framer-motion";
import connexion from "../services/connexion";
import { useLogin } from "../context/LoginContext";
import D6 from "../assets/images/D6bis.png";
import D12 from "../assets/images/D12bis.png";
import D20 from "../assets/images/D20.png";
import "../styles/dice-set.css";

const socket = io("http://localhost:5050");

// eslint-disable-next-line react/prop-types
function Dice({ sides, image, onClick }) {
  return (
    <motion.img
      src={image}
      alt={`Dé à ${sides} faces`} // Using template literal correctly
      onClick={() => {
        if (typeof onClick === "function") {
          onClick(sides);
        }
      }}
      className="dice-image"
    />
  );
}
function DiceSet() {
  const [result, setResult] = useState(null);
  const [rolling, setRolling] = useState(false);
  const [messages, setMessages] = useState([]);
  const { user } = useLogin();
  const [myProfil, setMyProfil] = useState({ user: "" });

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

  useEffect(() => {
    socket.on("newDice", (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    return () => {
      socket.off("newDice");
    };
  }, []);

  const rollDice = (sides) => {
    setRolling(true);
    setTimeout(() => {
      const rollResult = Math.floor(Math.random() * sides) + 1;
      setResult(rollResult);
      setRolling(false);

      const message = { myProfil, sides, rollResult };
      socket.emit("sendDice", message);
    }, 1000);
  };

  let displayMessage;

  if (rolling) {
    displayMessage = <div className="message">Lancement...</div>;
  } else if (result !== null) {
    displayMessage = <div className="message">Résultat : {result}</div>;
  } else {
    displayMessage = <div className="message">Lancer les Dés</div>;
  }

  return (
    <div className="container">
      <div className="dice-container">
        <Dice sides={6} image={D6} onClick={rollDice} />
        <Dice sides={12} image={D12} onClick={rollDice} />
        <Dice sides={20} image={D20} onClick={rollDice} />
      </div>
      {displayMessage}
      <div className="message-log">
        {messages.map((msg) => (
          <div key={messages.id}>
            {myProfil.pseudo} a lancé un dé à {msg.sides} faces : Résultat
            {msg.rollResult}
          </div>
        ))}
      </div>
    </div>
  );
}

export default DiceSet;
