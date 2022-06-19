import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import connection from './db/configs';
import { unknownError } from './globalHelpers/globalConstants';
import userRoutes from './routes/user';
import setupRoutes from './routes/setup';
import bodyParser from 'body-parser';
import session from 'express-session';
import authenticateUser from '../src/middlewares/validateAuth'

const app = express();
const cors = require('cors');
const PORT = process.env.BACKEND_PORT;
app.use(cors({ origin: `http://localhost:${process.env.FRONTEND_PORT}`, credentials: true }));
app.use(
  session({
    secret: 'please change this secret',
    resave: false,
    saveUninitialized: true,
  })
);
declare module 'express-session' {
  export interface SessionData {
    username: { [key: string]: any };
  }
}
app.use(bodyParser.json());
app.get('/private/', authenticateUser, function (req, res, next) {
  return res.end("This is private");
});
app.use("/user", userRoutes);
app.use("/setup", setupRoutes);
app.use(
  (
    err: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    res.status(500).json({ message: unknownError });
  }
);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

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
