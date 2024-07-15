import { CONNECTION_DB } from '../database/config.js';

export class TaskModel {
  static async getAll() {
    const { rows } = await CONNECTION_DB.query(
      'SELECT * FROM task ORDER BY id ASC'
    );

    return rows;
  }

  static async getById({ id }) {
    const { rows } = await CONNECTION_DB.query(
      'SELECT * FROM task WHERE id = $1',
      [id]
    );

    return rows[0] ? rows[0] : null;
  }

  static async create({ object }) {
    const { title, description, creation, expiration, status } = object;

    try {
      await CONNECTION_DB.query(
        'INSERT INTO task (title, description, creation, expiration, status) VALUES ($1, $2, $3, $4, $5)',
        [title, description, creation, expiration, status]
      );
    } catch (error) {
      throw new Error('Error al crear tarea');
    }

    const { rows } = await CONNECTION_DB.query(
      'SELECT * FROM task ORDER BY id DESC LIMIT 1'
    );

    return rows[0];
  }

  static async update({ object, id }) {
    const { title, description, expiration, status } = object;

    const { rows } = await CONNECTION_DB.query(
      'SELECT * FROM task WHERE id = $1',
      [id]
    );

    if (!rows[0]) null;

    try {
      await CONNECTION_DB.query(
        'UPDATE task SET title = COALESCE($1, title), description = COALESCE($2, description), expiration = COALESCE($3, expiration), status = COALESCE($4, status) WHERE id = $5',
        [title, description, expiration, status, id]
      );
    } catch (error) {
      throw new Error('Error al actualizar tarea');
    }

    const checkUpdate = await CONNECTION_DB.query(
      'SELECT * FROM task WHERE id = $1',
      [id]
    );

    return checkUpdate.rows[0];
  }

  static async delete({ id }) {
    const { rows } = await CONNECTION_DB.query(
      'SELECT * FROM task WHERE id = $1',
      [id]
    );

    if (!rows[0]) return false;

    try {
      await CONNECTION_DB.query('DELETE FROM task WHERE id = $1', [id]);
    } catch (error) {
      throw new Error('Error al eliminar tarea');
    }

    return true;
  }
}
