const tables = require("../../database/tables");

const browse = async (req, res) => {
  try {
    // Fetch all items from the database
    const user = await tables.characters.readAll();

    // Respond with the items in JSON format
    res.status(200).json(user);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    res.status(500).json(err);
  }
};
module.exports = {
  browse,
};
