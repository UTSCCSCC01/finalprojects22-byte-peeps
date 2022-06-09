import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import todoRoutes from './routes/todos';
import userRoutes from './routes/user'
import connection from './db/configs';
import { unknownError } from './globalHelpers/globalConstants';
import bodyParser from 'body-parser';
import session from 'express-session';

import { Users } from './models/user'
const app = express();
const bcrypt = require('bcrypt');


const PORT = 3000;


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

let isAuthenticated = function (req: any, res: any, next: any) {
  if (!req.session.username) return res.status(401).end("access denied");
  return next();
};
app.get('/private/', isAuthenticated, function (req, res, next) {
  return res.end("This is private");
});
app.use("/user", userRoutes);
app.use(
  (
    err: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    res.status(500).json({ 'message': unknownError });
  }
);

app.use('/todos', todoRoutes);

app.get('/', (req, res) => {
  res.json({ 'message': 'Hello World!' });
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
