import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import todoRoutes from './routes/todos';
import ytChannelRoutes from './routes/youtube/channel';
import ytVideoRoutes from './routes/youtube/video';
import ytCommentRoutes from './routes/youtube/comment';
import connection from './db/configs';
import { unknownError } from './globalHelpers/globalConstants';
import bodyParser from 'body-parser';
import session from 'express-session';

const app = express();

const PORT = 3000;

app.use('/youtube/channels', ytChannelRoutes);
app.use('/youtube/comments', ytCommentRoutes);
app.use('/youtube/videos', ytVideoRoutes);

app.use(
  session({
    secret: 'please change this secret',
    resave: false,
    saveUninitialized: true,
  })
);

app.use(bodyParser.json());

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
