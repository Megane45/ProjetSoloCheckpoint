import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "../styles/enter.css";

function Enter() {
  const navigate = useNavigate();
  const handleButtonClick = () => {
    navigate("/matchmaking"); // Redirection vers la page /matchmaking
  };
  return (
    <div className="page-container">
      <div className="content">
        <motion.h1
          className="title"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Bienvenue dans le Monde des Jeux de Rôle !
        </motion.h1>
        <motion.h2
          className="subtitle"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          Vivez des aventures épiques et créez votre propre légende
        </motion.h2>
        <motion.button
          className="button"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleButtonClick}
        >
          Commencer l'Aventure
        </motion.button>
      </div>
    </div>
  );
}

export default Enter;
