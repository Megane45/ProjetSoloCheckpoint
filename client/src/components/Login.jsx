import { useState } from "react";
import { useNavigate } from "react-router-dom";
import connexion from "../services/connexion";
import { useLogin } from "../context/LoginContext";

import "../styles/login.css";

function Login() {
  const [connect, setConnect] = useState({
    email: "",
    password: "",
  });
  const [showPopup, setShowPopup] = useState(false);
  const { setUser } = useLogin();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setConnect((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await connexion.post("/api/login", connect);
      const user = response.data;
      setUser({
        id: user.userId,
        role: user.role,
      });
      localStorage.setItem("isLoggedIn", "true");
      if (user.role === "admin") {
        navigate("/admin/users");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error("There was an error connecting the user!", error);
      setConnect({ email: "", password: "" });
      setShowPopup(true);
    }
  };

  return (
    <main className="login-container">
      <div className="login-box">
        <h1 className="login-title">Se Connecter</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              placeholder="Email"
              name="email"
              id="email"
              value={connect.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Mot de Passe</label>
            <input
              type="password"
              placeholder="Mot de passe"
              name="password"
              id="password"
              value={connect.password}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <button className="login-button" type="submit">
              Se Connecter
            </button>
          </div>
        </form>
        {showPopup && (
          <div className="popup-content">
            <p>Connexion impossible. Email ou Mot de passe invalide.</p>
          </div>
        )}
      </div>
    </main>
  );
}

export default Login;
