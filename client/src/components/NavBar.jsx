import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/navbar.css";

function Navbar() {
  const navigate = useNavigate();

  // Vérifier l'état de connexion depuis localStorage
  const [isLoggedIn, setIsLoggedIn] = useState(
    () => localStorage.getItem("isLoggedIn") === "true"
  );

  const handleLoginClick = () => {
    if (isLoggedIn) {
      // Déconnexion
      setIsLoggedIn(false);
      localStorage.setItem("isLoggedIn", "false"); // Mettre à jour localStorage
      navigate("/");
    } else {
      // Connexion
      navigate("/login");
    }
  };

  const handleSignupClick = () => {
    navigate("/signup");
  };

  return (
    <nav className="navbar">
      <h1 className="navbar-title">Batailles Et Beignets</h1>
      <div className="navbar-buttons">
        <button
          type="button"
          onClick={handleSignupClick}
          className="navbar-button"
        >
          Inscription
        </button>
        <button
          type="button"
          onClick={handleLoginClick}
          className="navbar-button"
        >
          {isLoggedIn ? "Déconnexion" : "Connexion"}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
