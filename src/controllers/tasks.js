import { validateTask } from '../schemas/tasks.js';

export class TaskController {
  constructor({ taskModel }) {
    this.taskModel = taskModel;
  }

  getAll = async (req, res) => {
    const result = await this.taskModel.getAll();
    res.json(result);
  };

  getById = async (req, res) => {
    const { id } = req.params;
    const result = await this.taskModel.getById({ id });
    res.json(result);
  };

  create = async (req, res) => {
    const result = validateTask(req.body);

    if (!result.success) {
      return res.status(400).json({
        error: JSON.parse(result.error.message),
      });
    }

    const newObject = await this.taskModel.create({
      object: result.data,
    });
    res.status(201).json(newObject);
  };

  update = async (req, res) => {
    const { id } = req.params;
    const result = validateTask(req.body);

    if (!result.success) {
      return res.status(400).json({
        error: JSON.parse(result.error.message),
      });
    }

    const updateObject = await this.taskModel.update({
      object: result.data,
      id,
    });

    if (!updateObject) {
      return res.status(404).json({ message: 'Tarea no encontrada' });
    }

    res.status(201).json(updateObject);
  };

  delete = async (req, res) => {
    const { id } = req.params;

    const deleteObject = await this.taskModel.delete({ id });

    if (deleteObject === false) {
      return res.status(404).json({ message: 'Tarea no encontrada' });
    }

    return res.json({ message: 'Tarea eliminada' });
  };
}
