import bcrypt from 'bcrypt';
import { RequestHandler } from 'express';
import Users from '../../models/user/user';
import {
  invalidCredentials,
  invalidPassword,
  invalidUsername,
  takenUsername,
} from './userConstants';

/**
 * Sign in a user and create a session
 * @param {req} request - must have a username and password in body
 * @return {res} returns a status code and possibly a message
 */
export const signIn: RequestHandler = async function (req, res, next) {
  // extract data from HTTP request
  if (!('username' in req.body))
    return res.status(400).json({ message: 'username is missing' });
  if (!('password' in req.body))
    return res.status(400).json({ message: 'password is missing' });

  let username = req.body.username;
  let password = req.body.password;
  let user: Users | null;

  // retrieve user from the database
  user = await Users.findOne({ where: { username: username } });
  if (!user) return res.status(401).json({ message: invalidCredentials });

  bcrypt.compare(
    password,
    user.password,
    function (err: Error | undefined, valid: boolean) {
      if (err) next(err);

      if (!valid) return res.status(401).json({ message: invalidCredentials });
      req.session.username = username;

      return res.status(200).send();
    }
  );
};

/**
 * Registers a new user
 * @param {req} request - must have a username and password in body
 * @return {res} returns a status code and possibly a message
 */
export const signUp: RequestHandler = async function (req, res, next) {
  // extract data from HTTP request
  if (!('username' in req.body))
    return res.status(400).json({ message: invalidUsername });
  if (!('password' in req.body))
    return res.status(400).json({ message: invalidPassword });

  let username = req.body.username;
  let password = req.body.password;

  // check if user already exists
  const user = await Users.findOne({ where: { username: username } });
  if (user) return res.status(409).json({ message: takenUsername });

  const saltRounds = 10;
  bcrypt.hash(password, saltRounds, async function (err: any, hash: any) {
    if (err) next(err);
    await Users.create({ username, password: hash });
    return res.status(200).send();
  });
};

/**
 * Destroys a session
 * @param {req} request
 * @return {res} returns a status code and possibly a message
 */
export const signOut: RequestHandler = function (req, res, next) {
  req.session.destroy(function (err) {
    if (err) next(err);
  });

  return res.status(200).send();
};
