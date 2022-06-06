import { RequestHandler } from 'express';
const bcrypt = require('bcrypt');
import connection from '../db/configs';
const users = connection.models.Users

export const register: RequestHandler = async function (req, res, next) {
  // extract data from HTTP request
  if (!('username' in req.body)) return res.status(400).end('username is missing');
  if (!('password' in req.body)) return res.status(400).end('password is missing');
  let username = req.body.username;
  let password = req.body.password;
  // check if user already exists
  try {
    const user = await users.findOne({ where: { username: username } })
    if (user) return res.status(409).end("username " + username + " already exists");
  } catch (err) {
    return res.status(500).end(err);
  }
  // genearte a new salt and hash
  bcrypt.genSalt(10, function (err: any, salt: any) {
    bcrypt.hash(password, salt, async function (err: any, hash: any) {
      // insert new user into the database
      try {
        await users.create({ username, hash: hash });
        return res.end("account created")
      } catch (err) {
        return res.status(500).end(err)
      }
    });
  });
}
