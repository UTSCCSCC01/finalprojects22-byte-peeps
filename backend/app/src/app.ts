import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import todoRoutes from './routes/todos';
import connection from './db/configs';
import { unknownError } from './globalHelpers/globalConstants';
import bodyParser from 'body-parser';
import session from 'express-session';
import { register as registrationHander } from './controllers/users';
const app = express();
const bcrypt = require('bcrypt');

const users = connection.models.Users
const PORT = 3000;
type userType = {
  username: string,
  hash: string
} | null;

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


app.post('/register/', ((req, res, next) => registrationHander(req, res, next)))
app.post('/login/', async function (req, res, next) {
  // extract data from HTTP request
  if (!('username' in req.body)) return res.status(400).end('username is missing');
  if (!('password' in req.body)) return res.status(400).end('password is missing');
  let username = req.body.username;
  let password = req.body.password;
  let user: userType;
  // retrieve user from the database
  try {
    user = await users.findOne({ where: { username: username } })
    if (!user) return res.status(401).end("access denied");
  } catch (err) {
    return res.status(500).end(err);
  }
  bcrypt.compare(password, user.hash, function (err: any, valid: any) {
    if (err) return res.status(500).end(err);
    if (!valid) return res.status(401).end("access denied");
    // start a session
    req.session.username = username;
    return res.end("user " + username + " has been signed in");
  });
});

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

app.use('/todos', todoRoutes);

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
