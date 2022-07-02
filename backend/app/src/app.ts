import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import connection from './db/configs';
import bodyParser from 'body-parser';
import session from 'express-session';
import cors from 'cors';
import authenticateUser from './middlewares/validateAuth';
import notFoundHandler from './middlewares/notFoundHandler';

/* Routing imports */
import userRoutes from './routes/user';
import instagramRoutes from './routes/instagram/routes';
import facebookRoutes from './routes/facebook/routes';
import setupRoutes from './routes/setup/routes';

/* Cron Job imports */
import { instagramScheduledJob } from './dataPipelines/instagram';
import { facebookScheduledJob } from './dataPipelines/facebook';
import errorHandler from './middlewares/errorHandler';

const app = express();

const PORT = process.env.BACKEND_PORT;

// Adapted from: https://medium.com/zero-equals-false/using-cors-in-express-cac7e29b005b
let allowedOrigins = [
  `http://localhost:${process.env.FRONTEND_PORT}`,
  'http://yourapp.com',
];

app.use(
  cors({
    origin: function (origin: string | undefined, callback: Function) {
      // allow requests with no origin
      // (like mobile apps or curl requests)
      if (!origin) return callback(null, true);

      if (allowedOrigins.indexOf(origin) === -1) {
        var msg =
          'The CORS policy for this site does not ' +
          'allow access from the specified Origin.';
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    credentials: true,
  })
);

app.use(
  session({
    secret: String(process.env.SESSION_SECRET),
    resave: false,
    saveUninitialized: true,
  })
);

app.use(bodyParser.json());

declare module 'express-session' {
  export interface SessionData {
    username: { [key: string]: any };
  }
}

/* User Routes */
app.use('/user', userRoutes);

/* Social Media Routing */
app.use('/instagram', instagramRoutes);
app.use('/facebook', facebookRoutes);

/* Setup Routing */
app.use('/setup', authenticateUser, setupRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

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

/* Cron Jobs */
instagramScheduledJob.start();
facebookScheduledJob.start();
