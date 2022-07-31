import e, { RequestHandler } from 'express';
import * as api from '../../apis/reddit';
import RedditSubreddit from '../../models/reddit/subreddit';
import RedditListing from '../../models/reddit/listing';
import RedditComment from '../../models/reddit/comment';
import User from '../../models/user/user';
import { startPipeline } from '../../dataPipelines/reddit';

export const getSettings: RequestHandler = async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: { username: req.session.username },
      include: [RedditSubreddit],
    });

    if (user?.subreddit == undefined) {
      return res.send({
        status: 'reddit-not-set-up',
        subreddit: null,
      });
    }

    return res.send({
      status: 'active',
      subreddit: user.subreddit.name,
    });
  } catch (err) {
    return res.status(500).send(err);
  }
};

export const connectSubreddit: RequestHandler = async (req, res, next) => {
  try {
    let returnSubreddit = null;
    const newSubreddit = req.body.subreddit;

    const user = await User.findOne({
      where: { username: req.session.username },
      include: [RedditSubreddit],
    });

    // Existing setup
    if (user?.subreddit != undefined) {
      // If subreddit is same as existing, return
      if (user.subreddit.name == newSubreddit) {
        return res.status(200).send({
          status: 'active',
          subreddit: newSubreddit,
          message: 'This subreddit is already connected!',
        });
      }

      // Destroy associated data
      const listingIds = (
        await RedditListing.findAll({
          where: { subredditId: user.subreddit.id },
        })
      ).map((p) => p.id);
      await RedditComment.destroy({ where: { listingId: listingIds } });
      await RedditListing.destroy({ where: { id: listingIds } });
      await user.subreddit.destroy();

      // Check if new subreddit already exists
      const existingSubreddit = await RedditSubreddit.findOne({
        where: { name: newSubreddit },
        paranoid: false,
      });

      // New user already exists
      if (existingSubreddit) {
        await existingSubreddit.restore();

        const existingListingIds = (
          await RedditListing.findAll({
            where: { subredditId: existingSubreddit.id },
            paranoid: false,
          })
        ).map((p) => p.id);
        await RedditListing.restore({ where: { id: existingListingIds } });
        await RedditComment.restore({
          where: { listingId: existingListingIds },
        });

        returnSubreddit = newSubreddit;
      }
    }

    // User doesn't exist
    if (returnSubreddit === null) {
      // Check that subreddit exists
      const real = await api.getSubreddit(newSubreddit);
      if (!real) {
        return res.send({
          status: 'reddit-not-set-up',
          subreddit: null,
          message: "The subreddit that you provided doesn't exist!",
        });
      }

      // Create user
      await RedditSubreddit.create({
        name: newSubreddit,
        userId: user!.id,
      });

      returnSubreddit = newSubreddit;
    }

    return res.status(200).send({
      status: 'active',
      subreddit: returnSubreddit,
      message: 'The subreddit has been connected successfully!',
    });
  } catch (err) {
    return res.status(500).send(err);
  }
};

export const populateFirstTime: RequestHandler = async (req, res, next) => {
  try {
    await startPipeline(true);
    return res.send('Reddit data has been pulled');
  } catch (err: any) {
    return res.status(500).send(err);
  }
};
