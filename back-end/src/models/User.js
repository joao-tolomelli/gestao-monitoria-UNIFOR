const { query } = require("../database");

class User {
  constructor(userRow) {
    this.id = userRow.id;
    this.name = userRow.name;
    this.cpf = userRow.cpf;
    this.email = userRow.email;
    this.status = userRow.status;
    this.guestGroup = userRow.guest_group;
    this.createdAt = new Date(userRow.created_at);
    this.updatedAt = new Date(userRow.updated_at);
  }

  static async findAll() {
    const result = await query(`SELECT * FROM Users;`);
    return result.rows.map((row) => new User(row));
  }

  static async create({ name, cpf, email, guestGroup }) {
    const result = await query(
      `INSERT INTO Users (name, cpf, email, guest_group)
           VALUES ($1, $2, $3, $4)
           RETURNING *`,
      [name, cpf, email, guestGroup]
    );
    return new User(result.rows[0]);
  }

  static async findById(id) {
    const result = await query(`SELECT * FROM Users WHERE id = $1`, [id]);

    if (!result.rows[0]) return null;

    return new User(result.rows[0]);
  }

  static async findByCPF(cpf) {
    const result = await query(`SELECT * FROM Users WHERE cpf = $1`, [cpf]);

    if (!result.rows[0]) return null;

    return new User(result.rows[0]);
  }



  static async update(id, attributes) {
    const { rows } = await query(`SELECT * FROM Users WHERE id = $1`, [id]);
    if (!rows[0]) return null;

    const user = new User(rows[0]);

    // Substitui os atributos de user pelos passados em attributes
    Object.assign(user, attributes);

    await query(
      `UPDATE Users SET
                name = $1,
                cpf = $2,
                email = $3,
                status = $4,
                guest_group = $5,
                updated_at = CURRENT_TIMESTAMP
            WHERE id = $6`,
      [user.name, user.cpf, user.email, user.status, user.guestGroup, user.id]
    );

    return user;
  }

  static async delete(id) {
    await query(`DELETE FROM Users WHERE id = $1`, [id]);
    return { message: "User deleted successfully." };
  }
}

module.exports = User;
