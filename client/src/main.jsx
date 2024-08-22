import React from "react";
import ReactDOM from "react-dom/client";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { LoginProvider } from "./context/LoginContext";

import App from "./App";
import MatchMaking from "./components/MatchMaking";
import Login from "./components/Login";
import Enter from "./components/Enter";
import Signup from "./components/Signup";
import CharacterForm from "./components/CharacterForm";
import Profil from "./components/Profil";
import "./App.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Enter />,
      },
      {
        path: "/matchmaking",
        element: <MatchMaking />,
      },
      {
        path: "/matchmaking/:id",
        element: <CharacterForm />,
      },
    ],
  },

  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/profil",
    element: <Profil />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <LoginProvider>
      <RouterProvider router={router} />
    </LoginProvider>
  </React.StrictMode>
);
