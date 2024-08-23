/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useNavigate, Link } from "react-router-dom";
import "../styles/navbar.css";
import Logo from "../assets/images/Profil.png";

function Navbar() {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  const handleLoginOrLogOutClick = () => {
    if (isLoggedIn) {
      localStorage.setItem("isLoggedIn", "false");
      navigate("/");
    } else {
      navigate("/login");
    }
  };

  const handleSignupClick = () => {
    navigate("/signup");
  };

  const handleProfileClick = () => {
    navigate("/profil");
  };

  return (
    <nav className="navbar">
      <Link to="/matchmaking" className="navbar-title">
        Batailles Et Beignets
      </Link>
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
          onClick={handleLoginOrLogOutClick}
          className="navbar-button"
        >
          {isLoggedIn ? "Déconnexion" : "Connexion"}
        </button>
        {isLoggedIn && (
          <img
            src={Logo}
            alt="Profil"
            className="profile-logo"
            onClick={handleProfileClick}
          />
        )}
      </div>
    </nav>
  );
}

export default Navbar;
