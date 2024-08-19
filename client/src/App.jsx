import { Outlet } from "react-router-dom";
import Navbar from "./components/NavBar";
import "./App.css";

function App() {
  return (
    <main className="container">
      <div className="App">
        <Navbar />
        <Outlet />
      </div>
    </main>
  );
}

export default App;
