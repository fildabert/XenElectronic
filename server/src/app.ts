import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import routes from './routes';
import AppError, { ErrorCode } from './error';

dotenv.config();
const port = process.env.PORT || 3030;
const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/', routes);

// eslint-disable-next-line no-unused-vars
app.use((err: AppError, _req: Request, res: Response, _next: NextFunction) => {
  let error = err;
  if (!error.errorCode) {
    error = new AppError(ErrorCode.INTERNAL_SERVER_ERROR);
  }
  console.log(error);
  res.status(error.errorCode).json({ message: error.message, data: error.data });
});

app.get<{}, {data: string}, {asd: string}>('/ping', async (req, res) => {
  res.status(200).json({ data: 'pong' });
});

export const start = async () => {
  // await mongoose.connect(process.env.MONGO_URL || '');
  await mongoose.connect('mongodb://localhost:27017/xendit');

  app.listen(port, () => {
    console.log(`Server started at port ${port}`);
  });
};

export default app;
