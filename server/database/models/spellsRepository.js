const AbstractRepository = require("./AbstractRepository");

class SpellsRepository extends AbstractRepository {
  constructor() {
    // Call the constructor of the parent class (AbstractRepository)
    // and pass the table name "user" as configuration
    super({ table: "spell" });
  }

  // The C of CRUD - Create operation

  async create(spells) {
    // Execute the SQL INSERT query to add a new user to the "user" table
    const [result] = await this.database.query(
      `insert into ${this.table} (id, spell_title, spell_description, character_id) values (?, ?, ?, ?)`,
      [
        spells.id,
        spells.spell_title,
        spells.spell_description,
        spells.character_id,
      ]
    );

    // Return the ID of the newly inserted user
    return result.insertId;
  }

  // The Rs of CRUD - Read operations

  // The Rs of CRUD - Read operations

  async readByCharacterId(id) {
    const [rows] = await this.database.query(
      `select * from ${this.table} where character_id = ?`,
      [id]
    );

    // Return the first row of the result, which represents the user
    return rows[0];
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all spells from the "user" table
    const [rows] = await this.database.query(
      `select id, spell_title, spell_description, character_id from ${this.table}`
    );

    // Return the array of spells
    return rows;
  }

  // The U of CRUD - Update operation
  // TODO: Implement the update operation to modify an existing user

  async update(spells) {
    try {
      // Execute the SQL UPDATE query to update a specific category
      const [result] = await this.database.query(
        `UPDATE ${this.table} SET spell_title = ?, spell_description = ? WHERE id = ?`,
        [spells.spell_title, spells.spell_description, spells.id]
      );
      // Return the number of affected rows
      return result.affectedRows;
    } catch (error) {
      // Handle errors here (log, rethrow, etc.)
      console.error("Error updating spell:", error);
      throw error; // Optionally, rethrow the error for the caller to handle
    }
  }
}

module.exports = SpellsRepository;
