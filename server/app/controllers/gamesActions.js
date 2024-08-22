// Import access to database tables
const tables = require("../../database/tables");

// The B of BREAD - Browse (Read All) operation
const browse = async (req, res, next) => {
  try {
    // Fetch all items from the database
    const games = await tables.games.readAll();

    // Respond with the items in JSON format
    res.json(games);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The R of BREAD - Read operation
const join = async (req, res, next) => {
  try {
    const game = await tables.games.readById(req.params.id);
    if (!game) {
      return res.status(404).json({ message: "Game not found" });
    }
    if (game.player_ingame >= game.player_max) {
      return res.status(400).json({ message: "Game is full" });
    }
    return res.json({});
  } catch (err) {
    return next(err);
  }
};

// The E of BREAD - Edit (Update) operation
// This operation is not yet implemented
const readGameForUser = async (req, res) => {
  try {
    // Fetch all items from the database
    const user = await tables.games.readGameForUser(req.params.id);

    // Respond with the items in JSON format
    res.status(200).json(user);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    res.status(500).json(err);
  }
};
// The A of BREAD - Add (Create) operation
const create = async (req, res, next) => {
  try {
    // Extract the item data from the request body
    const games = req.body;

    // Create a new character entry in the database
    await tables.games.create(games);

    // Respond with HTTP 201 (Created) since the creation was successful
    res.sendStatus(201);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};
// The D of BREAD - Destroy (Delete) operation
// This operation is not yet implemented
const destroy = async (req, res) => {
  try {
    // Fetch the userId from the request parameters
    const gameID = req.params.id;

    // Attempt to delete the user from the database
    const rows = await tables.games.deleteGame(gameID);

    // Check if any rows were affected (meaning the user was deleted)
    if (rows.affectedRows > 0) {
      res.sendStatus(200);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    console.error("Error deleting games:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
// Ready to export the controller functions
module.exports = {
  browse,
  readGameForUser,
  join,
  // edit,
  create,
  destroy,
};
