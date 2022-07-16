import dotenv from 'dotenv';
dotenv.config();

import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import startPipelines from './dataPipelines/startPipelines';
import connection from './db/configs';
import corsHandler from './middlewares/corsHandler';
import errorHandler from './middlewares/errorHandler';
import notFoundHandler from './middlewares/notFoundHandler';
import sessionHandler from './middlewares/sessionHandler';
import requestRouter from './routes/routes';
import addFakeData from './dataPipelines/fakeData/fakeData';

const app = express();

const PORT = process.env.BACKEND_PORT;

app.use(bodyParser.json());
app.use(sessionHandler);
app.use(cors(corsHandler));
app.use(requestRouter);
app.use(notFoundHandler);
app.use(errorHandler);

connection
  .sync({ alter: true })
  .then(() => {
    console.log('Database successfully synced and connected');
  })
  .catch((err) => {
    console.log('Error: ', err);
  });

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

startPipelines();
// addFakeData();
