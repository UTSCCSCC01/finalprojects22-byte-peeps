import { RequestHandler } from 'express';
import { Users } from '../models/user';

const bcrypt = require('bcrypt');
type userType = {
  username: string,
  password: string
} | null;
export const login: RequestHandler = async function (req, res, next) {
  // extract data from HTTP request
  if (!('username' in req.body)) return res.status(400).json({ 'message': 'username is missing' });
  if (!('password' in req.body)) return res.status(400).json({ 'message': 'password is missing' });
  let username = req.body.username;
  let password = req.body.password;
  let user: userType;
  // retrieve user from the database
  try {
    user = await Users.findOne({ where: { username: username } })
    if (!user) return res.status(401).json({ 'message': "access denied" });
  } catch (err) {
    return res.status(500).json({ 'message': err });
  }
  bcrypt.compare(password, user.password, function (err: any, valid: any) {
    if (err) return res.status(500).json({ 'message': err });
    if (!valid) return res.status(401).json({ 'message': "access denied" });
    // start a session
    req.session.username = username;
    return res.json({ 'message': "user " + username + " has been signed in" });
  });
}
export const register: RequestHandler = async function (req, res, next) {
  // extract data from HTTP request
  if (!('username' in req.body)) return res.status(400).json({ 'message': 'username is missing' });
  if (!('password' in req.body)) return res.status(400).json({ 'message': 'password is missing' });
  let username = req.body.username;
  let password = req.body.password;

  // check if user already exists
  try {
    const user = await Users.findOne({ where: { username: username } })
    if (user) return res.status(409).json({ 'message': "username " + username + " already exists" });
  } catch (err) {
    return res.status(500).json({ 'message': err });
  }

  // genearte a new salt and hash
  const saltRounds = 10
  bcrypt.hash(password, saltRounds, async function (err: any, hash: any) {

    // insert new user into the database
    try {
      await Users.create({ username, password: hash });
      return res.json({ 'message': "account created" })
    } catch (err) {
      return res.status(500).json({ 'message': err })
    }
  });

}
export const logout: RequestHandler = function (req, res, next) {
  // ! session is destoryed
  req.session.destroy(function (err) {
    // cannot access session here
  });
  return res.end("user has been signed out");
}

