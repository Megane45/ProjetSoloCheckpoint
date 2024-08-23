const tables = require("../../database/tables");

const browse = async (req, res) => {
  try {
    const characters = await tables.characters.readAll();
    res.status(200).json(characters);
  } catch (err) {
    res.status(500).json({
      message: "Erreur lors de la récupération des personnages",
      error: err.message,
    });
  }
};

const create = async (req, res, next) => {
  try {
    // Extract the item data from the request body
    const characters = req.body;

    // Create a new character entry in the database
    await tables.characters.create(characters);

    // Respond with HTTP 201 (Created) since the creation was successful
    res.sendStatus(201);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

const readCharacterForUser = async (req, res) => {
  try {
    // Fetch all items from the database
    const user = await tables.characters.readCharacterForUser(req.params.id);

    // Respond with the items in JSON format
    res.status(200).json(user);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    res.status(500).json(err);
  }
};

const read = async (req, res) => {
  try {
    const character = await tables.characters.readById(req.params.id);
    if (!character) {
      res.status(404).json({ message: "Personnage non trouvé" });
    }
    res.status(200).json(character);
  } catch (err) {
    res.status(500).json({
      message: "Erreur lors de la récupération du personnage",
      error: err.message,
    });
  }
};

const update = async (req, res) => {
  try {
    const updatedCharacter = await tables.characters.update(
      req.params.id,
      req.body
    );
    if (!updatedCharacter) {
      res.status(404).json({ message: "Personnage non trouvé" });
    }
    res.status(200).json(updatedCharacter);
  } catch (err) {
    res.status(400).json({
      message: "Erreur lors de la mise à jour du personnage",
      error: err.message,
    });
  }
};

const deleteCharacters = async (req, res) => {
  try {
    // Fetch the userId from the request parameters
    const characterID = req.params.id;

    // Attempt to delete the user from the database
    const rows = await tables.characters.deleteCharacters(characterID);

    // Check if any rows were affected (meaning the user was deleted)
    if (rows.affectedRows > 0) {
      res.sendStatus(200);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    console.error("Error deleting character:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  browse,
  create,
  read,
  update,
  readCharacterForUser,
  deleteCharacters,
};
