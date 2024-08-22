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

const deleteCharacter = async (req, res) => {
  try {
    const deletedCharacter = await tables.characters.delete(req.params.id);
    if (!deletedCharacter.affectedRows) {
      res.status(404).json({ message: "Personnage non trouvé" });
    }
    res.status(200).json({ message: "Personnage supprimé avec succès" });
  } catch (err) {
    res.status(500).json({
      message: "Erreur lors de la suppression du personnage",
      error: err.message,
    });
  }
};

module.exports = {
  browse,
  create,
  read,
  update,
  delete: deleteCharacter,
};
