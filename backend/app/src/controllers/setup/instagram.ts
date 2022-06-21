import e, { RequestHandler } from "express";
import * as api from "../../apis/instagram";
import FacebookApi from "../../models/facebook/api";
import InstagramApi from "../../models/instagram/api";
import User from "../../models/user/user";

export const getSettings: RequestHandler = async (req, res, next) => {
  try {
    const user = await User.findOne({where: { username: req.session.username }, include: [InstagramApi, FacebookApi]});
    
    if (user?.facebookApi == undefined) {
      return res.send({ status: 'fb-not-set-up', page: null, currentPageId: null });

    } else if (!user.facebookApi.isActive) {
      return res.send({ status: 'inactive', page: null, currentPageId: null });

    } else if (user.instagramApi == undefined) {
      const pageId = await api.getPageIdByToken(user.facebookApi.token);
      const page = await api.getPage(user.facebookApi.token, pageId);
      return res.send({ status: 'ig-not-set-up', page: page, currentPageId: null });

    } 
      
    const pageId = await api.getPageIdByToken(user.facebookApi.token);
    const page = await api.getPage(user.facebookApi.token, pageId);
    const currentPage = await api.getPage(user.facebookApi.token, user.instagramApi.nodeId);
    return res.send({ status: 'active', page: page, currentPageId: currentPage?.id ?? null });

  } catch(err) {
    console.log(err);
    return res.status(500).send(err);
  }
};

export const connectPage: RequestHandler = async (req, res, next) => {
  // try {
  //   const user = await User.findOne({where: { username: req.session.username }, include: FacebookApi});
  //   const pageToken = req.body.token;
  //   if (pageToken == undefined)
  //     return res.status(400).send();

  //   const longToken = await api.getPageLongToken(pageToken);
  //   const page = await api.getPage(longToken);

  //   // Existing token is the same page
  //   if (user?.facebookApi != undefined && user.facebookApi.pageId === page.id) {
  //     user.facebookApi.token = longToken;
  //     user.facebookApi.isActive = true;
  //     await user.facebookApi.save();

  //   // Existing token is another page
  //   } else if (user?.facebookApi != undefined) {
  //     user.facebookApi.isActive = false;
  //     await user.facebookApi.save();
      
  //     // Destroy associated data
  //     const postIds = (await FacebookPost.findAll({where: { apiId: user.facebookApi.id}})).map(p => p.id);
  //     await FacebookComment.destroy({where: { postId: postIds }});
  //     await FacebookPost.destroy({where: { id: postIds }});
  //     await user.facebookApi.destroy();

  //     // Page set-up before
  //     const existingApi = await FacebookApi.findOne({where: {pageId: page.id}, paranoid: false});
  //     if (existingApi) {
  //       existingApi.token = longToken;
  //       existingApi.isActive = true;
  //       await existingApi.save();
  //       await existingApi.restore();

  //       const existingApiPostIds = (await FacebookPost.findAll({where: { apiId: existingApi.id}, paranoid: false})).map(p => p.id);
  //       await FacebookPost.restore({where: { id: existingApiPostIds }});
  //       await FacebookComment.restore({where: { postId: existingApiPostIds } });
  //     } else {
  //       await FacebookApi.create({ pageId: page.id, token: longToken, isActive: true, userId: user?.id });
  //     }
  //   // No existing page
  //   } else {
  //     await FacebookApi.create({ pageId: page.id, token: longToken, isActive: true, userId: user?.id });
  //   }
    
  //   return res.status(200).send(page.name);
  // } catch (err) {
  //   return res.status(500).send(err);
  // } 
}