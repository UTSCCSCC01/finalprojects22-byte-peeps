import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import connection from './db/configs';
import { unknownError } from './globalHelpers/globalConstants';
import bodyParser from 'body-parser';
import session from 'express-session';

/* Routing imports */
import userRoutes from './routes/user'
import instagramRoutes from './routes/instagram/routes';
import facebookRoutes from './routes/facebook/routes';
import setupRoutes from './routes/setup/routes';

/* Cron Job imports */
import { instagramScheduledJob } from './dataPipelines/instagram';
import { facebookScheduledJob } from './dataPipelines/facebook';
import authenticateUser from './middlewares/validateAuth';

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
declare module 'express-session' {
  export interface SessionData {
    username: { [key: string]: any };
  }
}

/* User Routes */
app.use("/user", userRoutes);

/* Social Media Routing */
app.use('/instagram', authenticateUser, instagramRoutes);
app.use('/facebook', facebookRoutes);

/* Setup Routing */
app.use("/setup", authenticateUser, setupRoutes);

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