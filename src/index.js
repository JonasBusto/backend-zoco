import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { taskRouter } from './routes/tasks.js';
import { TaskModel } from './models/task.js';
import { userRouter } from './routes/users.js';
import { UserModel } from './models/user.js';
import { PORT } from './helpers/constants.js';

const app = express();
app.use(express.json());
app.use(cors());

app.use('/tasks', taskRouter({ taskModel: TaskModel }));
app.use('/users', userRouter({ userModel: UserModel }));

app.listen(PORT, () =>
  console.log('Backend ejecutandose en el puerto ' + PORT)
);
