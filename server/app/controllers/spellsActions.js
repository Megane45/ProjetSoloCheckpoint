// Import access to database tables
const tables = require("../../database/tables");

// The B of BREAD - Browse (Read All) operation
const browse = async (req, res) => {
  try {
    // Fetch all items from the database
    const spells = await tables.spells.readAll();

    // Respond with the items in JSON format
    res.status(200).json(spells);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    res.status(500).json(err);
  }
};

const create = async (req, res, next) => {
  try {
    // Extract the item data from the request body
    const spells = req.body;

    // Create a new character entry in the database
    const id = await tables.spells.create(spells);
    const fusion = { ...spells, id };
    // Respond with HTTP 201 (Created) since the creation was successful
    res.status(201).json(fusion);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};
// const login = async (req, res, next) => {
//   try {
//     const user = await tables.user.readByEmail(req.body.email);

//     if (user == null) {
//       res.sendStatus(403);
//     } else if (req.body.password === user.password) {
//       res.status(200).json({ connected: true, userId: user.id });
//     } else {
//       res.sendStatus(403);
//     }
//   } catch (err) {
//     next(err);
//   }
// };
const read = async (req, res) => {
  try {
    const spells = await tables.spells.readByCharacterId(req.params.id);
    if (!spells) {
      res.status(404).json({ message: "spells non trouvé" });
    }
    res.status(200).json(spells);
  } catch (err) {
    res.status(500).json({
      message: "Erreur lors de la récupération du spells",
      error: err.message,
    });
  }
};
// // The A of BREAD - Add (Create) operation
// const create = async (req, res, next) => {
//   // Extract the item data from the request body
//   const users = req.body;

//   try {
//     // Insert the item into the database
//     const insertId = await tables.user.create(users);

//     // Respond with HTTP 201 (Created) and the ID of the newly inserted item
//     res.status(201).json({ insertId });
//   } catch (err) {
//     // Pass any errors to the error-handling middleware
//     next(err);
//   }
// };
// // The E of BREAD - Edit (Update) operation
// // This operation is not yet implemented

const update = async (req, res, next) => {
  // Extract spell data from the request body and attach the id from the route parameters

  try {
    // Update the spell in the database
    await tables.spells.update(req.body);

    // Respond with HTTP 204 (No Content) to indicate successful update
    res.status(200).json(req.body);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

/** 
// The D of BREAD - Destroy (Delete) operation
// This operation is not yet implemented

const destroy = async (req, res) => {
  try {
    // Fetch the userId from the request parameters
    const userId = req.params.id;

    // Attempt to delete the user from the database
    const rows = await tables.user.destroy(userId);

    // Check if any rows were affected (meaning the user was deleted)
    if (rows.affectedRows > 0) {
      res.sendStatus(200);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    console.error("Error deleting user:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
*/

// Ready to export the controller functions
module.exports = {
  browse,
  // login,
  create,
  update,
  read,
};
