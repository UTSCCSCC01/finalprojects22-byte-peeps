import session from 'express-session';

declare module 'express-session' {
  export interface SessionData {
    username: { [key: string]: any };
  }
}

const sessionHandler = session({
  secret: String(process.env.SESSION_SECRET),
  resave: false,
  saveUninitialized: true,
});

export default sessionHandler;
