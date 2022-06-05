import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import todoRoutes from './routes/todos';
import connection from './db/configs';
import { unknownError } from './globalHelpers/globalConstants';
import bodyParser from 'body-parser';
import session from 'express-session';
const users = connection.models.Users
const app = express();

const PORT = 3000;

app.use(
  session({
    secret: 'please change this secret',
    resave: false,
    saveUninitialized: true,
  })
);

app.use(bodyParser.json());

// curl -X POST -d "username=admin&password=pass4admin" http://localhost:3000/signup/
app.post('/signup/', function (req, res, next) {
  // extract data from HTTP request
  if (!('username' in req.body)) return res.status(400).end('username is missing');
  if (!('password' in req.body)) return res.status(400).end('password is missing');
  let username = req.body.username;
  let password = req.body.password;
  users.findOne({ where: { username: username } }).then((user) => {
    console.log(user?.toJSON());
    return res.end("hello")
  }).catch((error) => {
    console.error(error)
  })

}

);

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
