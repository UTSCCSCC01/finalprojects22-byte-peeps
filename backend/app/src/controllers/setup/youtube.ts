import e, { RequestHandler } from 'express';
import * as api from '../../apis/youtube';
import YoutubeChannel from '../../models/youtube/channel';
import YoutubeVideo from '../../models/youtube/video';
import YoutubeComment from '../../models/youtube/comment';
import User from '../../models/user/user';
import { startPipeline } from '../../dataPipelines/youtube';

export const getSettings: RequestHandler = async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: { username: req.session.username },
      include: [YoutubeChannel],
    });

    if (user?.youtubeChannel == undefined) {
      return res.send({
        status: 'youtube-not-set-up',
        channel: null,
      });
    }

    return res.send({
      status: 'active',
      channel: user.youtubeChannel.name,
    });
  } catch (err) {
    return res.status(500).send(err);
  }
};

export const connectUser: RequestHandler = async (req, res, next) => {
  try {
    let returnChannel = null;
    const newChannel = req.body.channel;

    const user = await User.findOne({
      where: { username: req.session.username },
      include: [YoutubeChannel],
    });

    // Existing setup
    if (user?.youtubeChannel != undefined) {
      // If channel is same as existing, return
      if (user.youtubeChannel.channelId == newChannel) {
        return res.status(200).send({
          status: 'active',
          channel: newChannel,
          message: 'This channel is already connected!',
        });
      }

      // Destroy associated data
      const videoIds = (
        await YoutubeVideo.findAll({
          where: { channelId: user.youtubeChannel.id },
        })
      ).map((p) => p.id);
      await YoutubeComment.destroy({ where: { videoId: videoIds } });
      await YoutubeVideo.destroy({ where: { id: videoIds } });
      await user.youtubeChannel.destroy();

      // Check if new channel already exists
      const existingChannel = await YoutubeChannel.findOne({
        where: { channelId: newChannel },
        paranoid: false,
      });

      // New user already exists
      if (existingChannel) {
        await existingChannel.restore();

        const existingVideoIds = (
          await YoutubeVideo.findAll({
            where: { channelId: existingChannel.id },
            paranoid: false,
          })
        ).map((p) => p.id);
        await YoutubeVideo.restore({ where: { id: existingVideoIds } });
        await YoutubeComment.restore({
          where: { videoId: existingVideoIds },
        });

        returnChannel = existingChannel.name;
      }
    }

    // Channel doesn't exist
    if (returnChannel === null) {
      // Get new youtube channel name
      const channelName = await api.getChannelName(newChannel);
      if (!channelName) {
        return res.send({
          status: 'youtube-not-set-up',
          channel: null,
          message: "The channel ID you provided doesn't exist!",
        });
      }

      // Create channel
      await YoutubeChannel.create({
        channelId: newChannel,
        name: channelName,
        userId: user!.id,
      });

      returnChannel = channelName;
    }

    return res.status(200).send({
      status: 'active',
      channel: returnChannel,
      message: 'Youtube account has been connected successfully!',
    });
  } catch (err) {
    return res.status(500).send(err);
  }
};

export const populateFirstTime: RequestHandler = async (req, res, next) => {
  try {
    await startPipeline(true);
    return res.send('YouTube data has been pulled');
  } catch (err: any) {
    return res.status(500).send(err);
  }
};
