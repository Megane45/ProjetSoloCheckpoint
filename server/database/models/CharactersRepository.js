const AbstractRepository = require("./AbstractRepository");

class CharactersRepository extends AbstractRepository {
  constructor() {
    // Call the constructor of the parent class (AbstractRepository)
    // and pass the table name "user" as configuration
    super({ table: "characters" });
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all users from the "user" table
    const [rows] = await this.database.query(
      `select id, name, race, stat_force,stat_agilite,stat_sagesse,stat_charisme,pv,mana,status from ${this.table}`
    );

    // Return the array of users
    return rows;
  }
}
module.exports = CharactersRepository;
