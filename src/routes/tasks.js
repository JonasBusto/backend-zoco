import { Router } from 'express';
import { TaskController } from '../controllers/tasks.js';

export const taskRouter = ({ taskModel }) => {
  const tasksRouter = Router();

  const taskController = new TaskController({ taskModel });

  tasksRouter.get('/', taskController.getAll);
  tasksRouter.get('/:id', taskController.getById);

  return tasksRouter;
};
