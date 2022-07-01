import e, { RequestHandler } from 'express';
import * as api from '../../apis/twitter';
import TwitterUser from '../../models/twitter/user';
import TwitterTweet from '../../models/twitter/tweet';
import TwitterConversation from '../../models/twitter/conversation';
import User from '../../models/user/user';

export const getSettings: RequestHandler = async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: { username: req.session.username },
      include: [TwitterUser],
    });

    if (user?.twitterUser == undefined) {
      return res.send({
        status: 'twitter-not-set-up',
        user: null,
      });
    }

    return res.send({
      status: 'active',
      user: user,
    });
  } catch (err) {
    return res.status(500).send(err);
  }
};

export const connectUser: RequestHandler = async (req, res, next) => {
  try {
    let returnUser = null;
    const newUsername = req.body.username;

    const user = await User.findOne({
      where: { username: req.session.username },
      include: [TwitterUser],
    });

    // Existing setup
    if (user?.twitterUser != undefined) {
      // If username is same as existing, return
      if (user.twitterUser.username == newUsername) {
        return res.status(200).send({
          status: 'active',
          user: { id: user.twitterUser.userId, username: newUsername },
          message: 'This account is already connected!',
        });
      }

      // Destroy associated data
      const tweetIds = (
        await TwitterTweet.findAll({
          where: { twitterUserId: user.twitterUser.id },
        })
      ).map((p) => p.id);
      await TwitterConversation.destroy({ where: { tweetId: tweetIds } });
      await TwitterTweet.destroy({ where: { id: tweetIds } });
      await user.twitterUser.destroy();

      // Check if new user already exists
      const existingTwitterUser = await TwitterUser.findOne({
        where: { username: newUsername },
        paranoid: false,
      });

      // New user already exists
      if (existingTwitterUser) {
        await existingTwitterUser.restore();

        const existingTweetIds = (
          await TwitterTweet.findAll({
            where: { twitterUserId: existingTwitterUser.id },
            paranoid: false,
          })
        ).map((p) => p.id);
        await TwitterTweet.restore({ where: { id: existingTweetIds } });
        await TwitterConversation.restore({
          where: { tweetId: existingTweetIds },
        });

        returnUser = { id: existingTwitterUser.userId, username: newUsername };
      }
    }

    // User doesn't exist
    if (returnUser === null) {
      // Get new twitter user id
      const twitterUserId = await api.getUserId(newUsername);
      if (!twitterUserId) {
        return res.send({
          status: 'twitter-not-set-up',
          user: null,
          message: "The username you provided doesn't exist!",
        });
      }

      // Create user
      await TwitterUser.create({
        username: newUsername,
        twitterId: twitterUserId,
        userId: user!.id,
      });

      returnUser = { id: twitterUserId, username: newUsername };
    }

    return res.status(200).send({
      status: 'active',
      user: returnUser,
      message: 'Twitter account has been connected successfully!',
    });
  } catch (err) {
    return res.status(500).send(err);
  }
};
