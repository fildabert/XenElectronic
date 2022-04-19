import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import routes from './routes';
import AppError from './error';

const port = 3030;
const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/', routes);

app.use((err: AppError, _req: Request, res: Response, _next: NextFunction) => {
  console.log('halo2')
  let error = err;
  if (!error.errorCode) {
    error = new AppError(500, 'Internal Server Error');
  }
  res.status(error.errorCode).json({ message: error.message, data: error.data });
});

app.get<{}, {data: string}, {asd: string}>('/ping', (req, res) => {
  res.status(200).json({ data: 'pong' });
});

const start = async () => {
  await mongoose.connect('mongodb://localhost:27017/xendit');

  app.listen(port, () => {
    console.log(`Server started at port ${port}`);
  });
};

start();
