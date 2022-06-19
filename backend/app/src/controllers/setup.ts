import { RequestHandler } from "express";
import { getPage, getPageLongToken, getPages } from "../apis/facebook";
import FacebookApi from "../models/facebook/api";
import userModels from "../models/user/models";
import User from "../models/user/user";

export const getFacebookPages: RequestHandler = async (req, res, next) => {
  const token = req.query.token?.toString();
  if (token == undefined)
    return res.status(400).send();

  try {
    const pages = await getPages(token);
    return res.json(pages);
  } catch (err) {
    return res.status(500).send(err);
  }
};

export const facebookConnect: RequestHandler = async (req, res, next) => {
  try {
    const user = await User.findOne({where: { username: req.session.username }, include: FacebookApi});
    const pageName = req.body.name;
    const pageToken = req.body.token;
    if (pageName == undefined || pageToken == undefined)
      return res.status(400).send();

    const longToken = await getPageLongToken(pageToken);
    if (user?.facebookApi != undefined) {
      user.facebookApi.token = longToken;
      user.facebookApi.isActive = true;
      await user.facebookApi.save();
    } else {
      await FacebookApi.create({ pageName: pageName, token: longToken, isActive: true, userId: user?.id });
    }
    return res.status(200).send(pageName);
  } catch (err) {
    return res.status(500).send(err);
  } 
}

export const getFacebookCurrentPage: RequestHandler = async (req, res, next) => {
  let user: User = new User();
  try {
    user = await User.findOne({where: { username: req.session.username }, include: FacebookApi}) ?? user;
    if (user?.facebookApi == undefined)
      return res.send(null);
    if (!user.facebookApi.isActive)
      return res.send(false);

    const page = await getPage(user.facebookApi.token);
    return res.send(page);
  } catch (err: any) {
    if (err.response.status === 400) {
      user.facebookApi.isActive = false;
      user.facebookApi.save();
      return res.status(400).send();
    }
    return res.status(500).send(err);
  }
}