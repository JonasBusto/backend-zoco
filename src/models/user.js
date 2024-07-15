import { CONNECTION_DB } from '../database/config.js';

export class UserModel {
  static async getAll() {
    const { rows } = await CONNECTION_DB.query(
      'SELECT * FROM users ORDER BY id ASC'
    );

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

  static async update({ object, id }) {
    const { username, email, role } = object;

    const { rows } = await CONNECTION_DB.query(
      'SELECT * FROM users WHERE id = $1',
      [id]
    );

    if (!rows[0]) return { founded: false, repeated: false };

    const checkRepeated = await CONNECTION_DB.query(
      'SELECT * FROM users WHERE LOWER(username) = LOWER($1) OR LOWER(email) = LOWER($2)',
      [username, email]
    );

    if (checkRepeated.rows[0].id !== Number(id))
      return { founded: true, repeated: true };

    try {
      await CONNECTION_DB.query(
        'UPDATE users SET username = COALESCE($1, username), email = COALESCE($2, email), role = COALESCE($3, role) WHERE id = $4',
        [username, email, role, id]
      );
    } catch (error) {
      throw new Error('Error al actualizar usuario');
    }

    const checkUpdate = await CONNECTION_DB.query(
      'SELECT * FROM users WHERE id = $1',
      [id]
    );

    return checkUpdate.rows[0];
  }

  static async delete({ id }) {
    const { rows } = await CONNECTION_DB.query(
      'SELECT * FROM users WHERE id = $1',
      [id]
    );

    if (!rows[0]) return false;

    try {
      await CONNECTION_DB.query('DELETE FROM users WHERE id = $1', [id]);
    } catch (error) {
      throw new Error('Error al eliminar usuario');
    }

    return true;
  }
}
