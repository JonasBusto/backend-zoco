import { CONNECTION_DB } from '../database/config.js';

export class UserModel {
  static async getAll() {
    const { rows } = await CONNECTION_DB.query('SELECT * FROM users');

    return rows;
  }

  static async getById({ id }) {
    const { rows } = await CONNECTION_DB.query(
      'SELECT * FROM users WHERE id = $1',
      [id]
    );

    return rows[0] ? rows[0] : null;
  }

  static async register({ object }) {
    const { username, email, password, role } = object;

    const checkObject = await CONNECTION_DB.query(
      'SELECT * FROM users WHERE LOWER(username) = LOWER($1) OR LOWER(email) = LOWER($2)',
      [username, email]
    );

    if (checkObject.rows.length > 0) return null;

    try {
      await CONNECTION_DB.query(
        'INSERT INTO users (username, email, password, role) VALUES ($1, $2, $3, $4)',
        [username, email, password, role]
      );
    } catch (error) {
      throw new Error('Error al crear usuario');
    }

    const { rows } = await CONNECTION_DB.query(
      'SELECT * FROM users ORDER BY id DESC LIMIT 1'
    );

    return rows[0];
  }

  static async login({ object }) {
    const { email } = object;

    const { rows } = await CONNECTION_DB.query(
      'SELECT * FROM users WHERE LOWER(email) = LOWER($1)',
      [email]
    );

    return rows[0] ? rows[0] : null;
  }
}
