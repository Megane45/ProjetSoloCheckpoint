const AbstractRepository = require("./AbstractRepository");

class GamesRepository extends AbstractRepository {
  constructor() {
    // Appel du constructeur parent avec le nom de la table "games"
    super({ table: "games" });
  }

  // Lire tous les jeux
  async readAll() {
    try {
      const [rows] = await this.database.query(
        `SELECT id, title, player_ingame, player_max, created_at FROM ${this.table}`
      );
      return rows;
    } catch (error) {
      throw new Error(`Failed to read all games: ${error.message}`);
    }
  }

  async create(game) {
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (title, player_ingame, player_max) VALUES (?, ?, ?)`,
      [game.title, game.player_ingame, game.player_max]
    );
    return result.insertId;
  }

  // Lire un jeu par ID
  async readById(id) {
    const [rows] = await this.database.query(
      `SELECT * FROM ${this.table} WHERE id = ?`,
      [id]
    );
    return rows[0];
  }
}

module.exports = GamesRepository;
