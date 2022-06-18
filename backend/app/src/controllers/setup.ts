import { RequestHandler } from "express";
import { getPageLongToken, getPages } from "../apis/facebook";
import FacebookApi from "../models/facebook/api";
import User from "../models/user/user";

export const facebookPages: RequestHandler = async (req, res, next) => {
  const token = req.query.token?.toString();
  if (token == undefined)
    return res.status(400).send();

  try {
    const pages = await getPages(token);
    return res.json(pages);
  } catch (err) {
    return res.status(500).send();
  }
};

export const facebookConnect: RequestHandler = async (req, res, next) => {
  try {
    const user = await User.findOne({where: { username: req.session.username }, include: FacebookApi});
    const pageToken = req.body.token;
    if (pageToken == undefined)
      return res.status(400).send();

    const longToken = await getPageLongToken(pageToken);
    if (user?.facebookApi != undefined) {
      user.facebookApi.token = longToken;
      user.facebookApi.isActive = true;
      await user.facebookApi.save();
    } else {
      await FacebookApi.create({ token: longToken, isActive: true, userId: user?.id });
    }
    return res.status(200).send();
  } catch (err) {
    return res.status(500).send();
  } 
}