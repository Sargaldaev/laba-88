import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import config from './config';
import usersRouter from './routers/users';
import postsRouter from './routers/posts';

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.use('/users', usersRouter);
app.use('/posts', postsRouter);

const run = async () => {
  await mongoose.connect(config.db);
  app.listen(port, () => console.log(`server started on ${port} port`));
  process.on('exit', () => {
    mongoose.disconnect();
  });
};

void run().catch((e) => console.log(e));
