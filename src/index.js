import express from 'express';
import 'dotenv/config';
import { taskRouter } from './routes/tasks.js';
import { TaskModel } from './models/task.js';

const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());

app.use('/tasks', taskRouter({ taskModel: TaskModel }));

app.listen(PORT, () =>
  console.log('Backend ejecutandose en el puerto ' + PORT)
);
