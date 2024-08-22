/* eslint-disable react/prop-types */
import { useState } from "react";
import { motion } from "framer-motion";
import D6 from "../assets/images/D6bis.png";
import D12 from "../assets/images/D12bis.png";
import D20 from "../assets/images/D20.png";
import "../styles/dice-set.css";

function Dice({ sides, image, onClick }) {
  return (
    <motion.img
      src={image}
      alt={`Dé à ${sides} faces`}
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

  const rollDice = (sides) => {
    setRolling(true);
    setTimeout(() => {
      const rollResult = Math.floor(Math.random() * sides) + 1;
      setResult(rollResult);
      setRolling(false);
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
    </div>
  );
}

export default DiceSet;
