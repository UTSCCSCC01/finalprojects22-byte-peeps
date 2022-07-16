import e, { RequestHandler } from 'express';
import * as api from '../../apis/facebook';
import FacebookApi from '../../models/facebook/api';
import FacebookComment from '../../models/facebook/comment';
import FacebookPost from '../../models/facebook/post';
import User from '../../models/user/user';

export const getPages: RequestHandler = async (req, res, next) => {
  const token = req.query.token?.toString();
  if (token == undefined) return res.status(400).send();

  try {
    const pages = await api.getPages(token);
    return res.json(pages);
  } catch (err) {
    return res.status(500).send(err);
  }
};

export const connectPage: RequestHandler = async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: { username: req.session.username },
      include: FacebookApi,
    });
    const pageToken = req.body.token;
    if (pageToken == undefined) return res.status(400).send();

    const longToken = await api.getPageLongToken(pageToken);
    const page = await api.getPage(longToken);

    // Existing token is the same page
    if (user?.facebookApi != undefined && user.facebookApi.pageId === page.id) {
      user.facebookApi.token = longToken;
      user.facebookApi.isActive = true;
      await user.facebookApi.save();

      // Existing token is another page
    } else if (user?.facebookApi != undefined) {
      user.facebookApi.isActive = false;
      await user.facebookApi.save();

      // Destroy associated data
      const postIds = (
        await FacebookPost.findAll({ where: { apiId: user.facebookApi.id } })
      ).map((p) => p.id);
      await FacebookComment.destroy({ where: { postId: postIds } });
      await FacebookPost.destroy({ where: { id: postIds } });
      await user.facebookApi.destroy();

      // Page set-up before
      const existingApi = await FacebookApi.findOne({
        where: { pageId: page.id },
        paranoid: false,
      });
      if (existingApi) {
        existingApi.token = longToken;
        existingApi.isActive = true;
        await existingApi.save();
        await existingApi.restore();

        const existingApiPostIds = (
          await FacebookPost.findAll({
            where: { apiId: existingApi.id },
            paranoid: false,
          })
        ).map((p) => p.id);
        await FacebookPost.restore({ where: { id: existingApiPostIds } });
        await FacebookComment.restore({
          where: { postId: existingApiPostIds },
        });
      } else {
        await FacebookApi.create({
          pageId: page.id,
          token: longToken,
          isActive: true,
          userId: user?.id,
        });
      }
      // No existing page
    } else {
      await FacebookApi.create({
        pageId: page.id,
        token: longToken,
        isActive: true,
        userId: user?.id,
      });
    }

    return res.status(200).send(page.name);
  } catch (err) {
    return res.status(500).send(err);
  }
};

export const getCurrentPage: RequestHandler = async (req, res, next) => {
  let user: User = new User();
  try {
    user =
      (await User.findOne({
        where: { username: req.session.username },
        include: FacebookApi,
      })) ?? user;
    if (user?.facebookApi == undefined) return res.send('not-set-up');
    if (!user.facebookApi.isActive) return res.send('inactive');

    const page = await api.getPage(user.facebookApi.token);
    return res.send(page);
  } catch (err: any) {
    if (err.response.status === 400) {
      user.facebookApi.isActive = false;
      user.facebookApi.save();
      return res.status(400).send();
    }
    return res.status(500).send(err);
  }
};
