import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import config from "./config";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

const run = async () => {
  await mongoose.connect(config.db);
  app.listen(port, () => console.log(port));
  process.on('exit', () => {
    mongoose.disconnect();
  });
};

void run().catch(e => console.log(e));
