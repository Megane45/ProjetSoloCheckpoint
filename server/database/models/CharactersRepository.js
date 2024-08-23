const AbstractRepository = require("./AbstractRepository");

class CharactersRepository extends AbstractRepository {
  constructor() {
    // Call the constructor of the parent class (AbstractRepository)
    // and pass the table name "user" as configuration
    super({ table: "characters" });
  }

  async readAll() {
    try {
      const [rows] = await this.database.query(
        `SELECT id, name, race, stat_force, stat_agilite, stat_sagesse, stat_charisme, pv, mana, status FROM ${this.table}`
      );
      return rows;
    } catch (err) {
      console.error("Erreur lors de la récupération des personnages:", err);
      throw new Error("Erreur lors de la récupération des personnages");
    }
  }

  async readById(id) {
    const [rows] = await this.database.query(
      `SELECT * FROM ${this.table} WHERE id = ?`,
      [id]
    );
    return rows[0];
  }

  async readCharacterForUser(user) {
    const [rows] = await this.database.query(
      `SELECT * FROM ${this.table} WHERE user_id  = ?`,
      [user]
    );
    return rows;
  }

  async create(character) {
    const [result] = await this.database.query(
      `insert into ${this.table} (name, race, stat_force,stat_agilite,stat_sagesse,stat_charisme,pv,mana,status, user_id) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        character.name,
        character.race,
        character.stats.stat_force,
        character.stats.stat_agilite,
        character.stats.stat_sagesse,
        character.stats.stat_charisme,
        character.pv,
        character.mana,
        character.status,
        character.user_id,
      ]
    );

    // Return the ID of the newly inserted user
    return result.insertId;
  }

  async deleteCharacters(characterID) {
    const [rows] = await this.database.query(
      `DELETE FROM ${this.table} WHERE id=?`,
      [characterID]
    );
    return rows;
  }
}
module.exports = CharactersRepository;
