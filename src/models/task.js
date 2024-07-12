import { CONNECTION_DB } from '../database/config.js';

export class TaskModel {
  static async getAll() {
    const { rows } = await CONNECTION_DB.query('SELECT * FROM task');

    return rows;
  }

  static async getById({ id }) {
    const { rows } = await CONNECTION_DB.query(
      'SELECT * FROM task WHERE id = $1',
      [id]
    );

    return rows[0] ? rows[0] : null;
  }
}
