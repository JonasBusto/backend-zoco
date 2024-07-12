import { Router } from 'express';
import { UserController } from '../controllers/users.js';

export const userRouter = ({ userModel }) => {
  const usersRouter = Router();

  const userController = new UserController({ userModel });

  usersRouter.get('/', userController.getAll);
  usersRouter.get('/:id', userController.getById);
  usersRouter.post('/', userController.register);
  usersRouter.post('/login', userController.login);
  usersRouter.put('/:id', userController.update);
  usersRouter.delete('/:id', userController.delete);

  return usersRouter;
};
