import { Router } from 'express';
import { TaskController } from '../controllers/tasks.js';
import { checkRoleAuth, checkAuth } from '../middlewares/auth.js';

export const taskRouter = ({ taskModel }) => {
  const tasksRouter = Router();

  const taskController = new TaskController({ taskModel });

  tasksRouter.get('/', taskController.getAll);
  tasksRouter.get('/:id', taskController.getById);
  tasksRouter.post(
    '/',
    checkAuth,
    checkRoleAuth(['admin', 'user']),
    taskController.create
  );
  tasksRouter.put(
    '/:id',
    checkAuth,
    checkRoleAuth(['admin', 'user']),
    taskController.update
  );
  tasksRouter.delete(
    '/:id',
    checkAuth,
    checkRoleAuth(['admin']),
    taskController.delete
  );

  return tasksRouter;
};
