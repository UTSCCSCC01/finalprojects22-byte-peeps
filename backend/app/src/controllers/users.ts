import { RequestHandler } from 'express';
import { Users } from '../models/user';

const bcrypt = require('bcrypt');


export const register: RequestHandler = async function (req, res, next) {
  // extract data from HTTP request
  if (!('username' in req.body)) return res.status(400).json({ 'message': 'username is missing' });
  if (!('password' in req.body)) return res.status(400).json({ 'message': 'password is missing' });
  let username = req.body.username;
  let password = req.body.password;
  console.log(password)
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
      await Users.create({ username, hash: hash });
      return res.json({ 'message': "account created" })
    } catch (err) {
      return res.status(500).json({ 'message': err })
    }
  });
}
