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
import corsHandler from './middlewares/corsHandler';

const app = express();

declare module 'express-session' {
  export interface SessionData {
    username: { [key: string]: any };
  }
}

const PORT = process.env.BACKEND_PORT;

app.use(cors(corsHandler));

app.use(
  session({
    secret: String(process.env.SESSION_SECRET),
    resave: false,
    saveUninitialized: true,
  })
);

app.use(bodyParser.json());

/* User Routes */
app.use('/user', userRoutes);

/* Social Media Routing */
app.use('/instagram', authenticateUser, instagramRoutes);
app.use('/facebook', authenticateUser, facebookRoutes);

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
