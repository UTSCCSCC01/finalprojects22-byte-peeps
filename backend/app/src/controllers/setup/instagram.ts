import e, { RequestHandler } from 'express';
import * as api from '../../apis/instagram';
import { startPipeline } from '../../dataPipelines/instagram';
import FacebookApi from '../../models/facebook/api';
import InstagramApi from '../../models/instagram/api';
import InstagramComment from '../../models/instagram/comment';
import InstagramMedia from '../../models/instagram/media';
import User from '../../models/user/user';

export const getSettings: RequestHandler = async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: { username: req.session.username },
      include: [InstagramApi, FacebookApi],
    });

    if (user?.facebookApi == undefined) {
      return res.send({
        status: 'fb-not-set-up',
        page: null,
        connectedPageId: null,
      });
    } else if (!user.facebookApi.isActive) {
      return res.send({
        status: 'inactive',
        page: null,
        connectedPageId: null,
      });
    } else if (user.instagramApi == undefined) {
      const pageId = await api.getPageIdByToken(user.facebookApi.token);
      const page = await api.getPage(user.facebookApi.token, pageId);
      return res.send({
        status: 'ig-not-set-up',
        page: page,
        connectedPageId: null,
      });
    }

    const pageId = await api.getPageIdByToken(user.facebookApi.token);
    const page = await api.getPage(user.facebookApi.token, pageId);
    const connectedPage = await api.getPage(
      user.facebookApi.token,
      user.instagramApi.nodeId
    );
    return res.send({
      status: 'active',
      page: page,
      connectedPageId: connectedPage?.id ?? null,
    });
  } catch (err) {
    return res.status(500).send(err);
  }
};

export const connectPage: RequestHandler = async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: { username: req.session.username },
      include: [InstagramApi, FacebookApi],
    });
    const pageId = await api.getPageIdByToken(user!.facebookApi.token);

    // Existing setup
    if (user?.instagramApi != undefined) {
      // Destroy associated data
      const mediaIds = (
        await InstagramMedia.findAll({ where: { apiId: user.instagramApi.id } })
      ).map((p) => p.id);
      await InstagramComment.destroy({ where: { mediaId: mediaIds } });
      await InstagramMedia.destroy({ where: { id: mediaIds } });
      await user.instagramApi.destroy();

      const existingApi = await InstagramApi.findOne({
        where: { nodeId: pageId },
        paranoid: false,
      });
      // New setup existed before
      if (existingApi) {
        existingApi.facebookApiId = user.facebookApi.id;
        await existingApi.save();
        await existingApi.restore();

        const existingApiMediaIds = (
          await InstagramMedia.findAll({
            where: { apiId: existingApi.id },
            paranoid: false,
          })
        ).map((p) => p.id);
        await InstagramMedia.restore({ where: { id: existingApiMediaIds } });
        await InstagramComment.restore({
          where: { mediaId: existingApiMediaIds },
        });

        // First time setup
      } else {
        await InstagramApi.create({
          facebookApiId: user!.facebookApi.id,
          userId: user!.id,
          nodeId: pageId,
        });
      }

      // First time setup
    } else {
      await InstagramApi.create({
        facebookApiId: user!.facebookApi.id,
        userId: user!.id,
        nodeId: pageId,
      });
    }

    return res.status(200).send();
  } catch (err) {
    return res.status(500).send(err);
  }
};

export const populateFirstTime: RequestHandler = async (req, res, next) => {
  try {
    await startPipeline(true);
    return res.send('Instagram data has been pulled');
  } catch (err: any) {
    return res.status(500).send(err);
  }
};
