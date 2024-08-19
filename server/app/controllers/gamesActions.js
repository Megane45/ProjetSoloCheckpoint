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

// The A of BREAD - Add (Create) operation
const add = async (req, res, next) => {
  // Extract the item data from the request body
  const game = req.body;

  try {
    // Insert the item into the database
    const insertId = await tables.query("INSERT INTO games(title) VALUES (?)", [
      game.title,
    ]);

    // Respond with HTTP 201 (Created) and the ID of the newly inserted item
    res.status(201).json({ insertId });
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The D of BREAD - Destroy (Delete) operation
// This operation is not yet implemented

// Ready to export the controller functions
module.exports = {
  browse,
  join,
  // edit,
  add,
  // destroy,
};
