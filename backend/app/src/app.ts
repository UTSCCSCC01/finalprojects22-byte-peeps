import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import connection from './db/configs';
import { unknownError } from './globalHelpers/globalConstants';
import bodyParser from 'body-parser';
import session from 'express-session';
import authenticateUser from '../src/middlewares/validateAuth'

/* Routing imports */
import todoRoutes from './routes/todos';
import userRoutes from './routes/user'
import instagramMediaRoutes from './routes/instagram/media';
import instagramCommentRoutes from './routes/instagram/comment';
import instagramTagRoutes from './routes/instagram/tag';
import facebookPostRoutes from './routes/facebook/post';
import facebookCommentRoutes from './routes/facebook/comment';

/* Cron Job imports */
import { instagramScheduledJob } from './dataPipelines/instagram';
import { facebookScheduledJob } from './dataPipelines/facebook';

const app = express();
const cors = require('cors');
const PORT = 3000;
app.use(cors())
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

/* Social Media Routing */
app.use('/instagram/media', instagramMediaRoutes);
app.use('/instagram/comments', instagramCommentRoutes);
app.use('/instagram/tags', instagramTagRoutes);
app.use('/facebook/posts', facebookPostRoutes);
app.use('/facebook/comments', facebookCommentRoutes);

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

/* Cron Jobs */
instagramScheduledJob.start();
facebookScheduledJob.start();