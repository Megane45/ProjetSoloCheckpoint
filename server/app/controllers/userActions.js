/* eslint-disable no-console */
// Import access to database tables
const nodemailer = require("nodemailer");
const tables = require("../../database/tables");

// The B of BREAD - Browse (Read All) operation
const browse = async (req, res) => {
  try {
    // Fetch all items from the database
    const user = await tables.user.readAll();

    // Respond with the items in JSON format
    res.status(200).json(user);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    res.status(500).json(err);
  }
};

const login = async (req, res, next) => {
  try {
    const user = await tables.user.readByEmail(req.body.email);
    if (user == null) {
      res.sendStatus(403);
    } else if (req.body.password === user.password) {
      res.status(200).json({
        connected: true,
        userId: user.id,
        role: user.role, // Ajoutez le rôle ici
      });
    } else {
      res.sendStatus(403);
    }
  } catch (err) {
    next(err);
  }
};

const read = async (req, res) => {
  try {
    const user = await tables.user.readById(req.params.id);
    if (!user) {
      res.status(404).json({ message: "profil non trouvé" });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({
      message: "Erreur lors de la récupération du compte",
      error: err.message,
    });
  }
};
// The A of BREAD - Add (Create) operation
const create = async (req, res, next) => {
  // Extract the item data from the request body
  const users = req.body;

  try {
    // Insert the item into the database
    const insertId = await tables.user.create(users);
    const transporter = nodemailer.createTransport({
      port: 465, // true for 465, false for other ports
      host: "smtp.gmail.com",
      auth: {
        user: "bataillesbeignets@gmail.com",
        pass: "hnvf fqic ssbj sysd",
      },
      secure: true,
    });
    const mailData = {
      from: "bataillesbeignets@gmail.com", // sender address
      to: users.email, // list of receivers
      subject: "Sending Email using Node.js",
      text: "That was easy!",
      html: "<b>Hey Gamers! </b> <br> Bienvenue sur Batailles et Beignets <br/>",
    };
    transporter.sendMail(mailData, (err, info) => {
      if (err) console.log(err);
      else console.log(info);
    });
    // Respond with HTTP 201 (Created) and the ID of the newly inserted item
    res.status(201).json({ insertId });
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};
// The E of BREAD - Edit (Update) operation
// This operation is not yet implemented

const update = async (req, res, next) => {
  // Extract the user data from the request body and params
  const userId = { ...req.body, id: req.params.id };

  try {
    // Update the user in the database
    await tables.user.update(userId);

    // Respond with HTTP 204 (No Content)
    res.sendStatus(204);
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

// Ready to export the controller functions
module.exports = {
  browse,
  login,
  create,
  update,
  read,
  destroy,
};
