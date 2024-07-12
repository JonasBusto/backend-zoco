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
}
