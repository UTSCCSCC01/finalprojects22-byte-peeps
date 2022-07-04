import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import connection from './db/configs';
import bodyParser from 'body-parser';
import cors from 'cors';
import requestRouter from './routes/routes';
import sessionHandler from './middlewares/sessionHandler';
import notFoundHandler from './middlewares/notFoundHandler';
import errorHandler from './middlewares/errorHandler';
import corsHandler from './middlewares/corsHandler';
import startPipelines from './dataPipelines/startPipelines';

const app = express();

const PORT = process.env.BACKEND_PORT;

app.use(bodyParser.json());
app.use(sessionHandler);
app.use(cors(corsHandler));

app.use(requestRouter);
app.use(notFoundHandler);
app.use(errorHandler);

connection
  .sync()
  .then(() => {
    console.log('Database successfully connected');
  })
  .catch((err) => {
    console.log('Error', err);
  });

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

startPipelines();
