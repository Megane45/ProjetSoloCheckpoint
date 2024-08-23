const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import itemActions module for handling item-related operations
const itemActions = require("./controllers/itemActions");

// Route to get a list of items
router.get("/items", itemActions.browse);

// Route to get a specific item by ID
router.get("/items/:id", itemActions.read);

// Route to add a new item
router.post("/items", itemActions.add);

const gamesActions = require("./controllers/gamesActions");

router.get("/games", gamesActions.browse);

router.post("/games/join/:id", gamesActions.join);

router.post("/games", gamesActions.create);

router.get("/profil/games/:id", gamesActions.readGameForUser);

router.delete("/games/:id", gamesActions.destroy);

const userActions = require("./controllers/userActions");

router.get("/users", userActions.browse);

router.get("/profil/user/:id", userActions.read);

router.post("/login", userActions.login);

router.post("/signup", userActions.create);

const charactersActions = require("./controllers/charactersActions");

router.get("/characters", charactersActions.browse);

router.post("/characters", charactersActions.create);

router.get("/characters/:id", charactersActions.read);

router.get("/profil/character/:id", charactersActions.readCharacterForUser);
// router.put("/characters/:id", charactersActions.update);

router.delete("/characters/:id", charactersActions.deleteCharacters);

/* ************************************************************************* */

module.exports = router;
