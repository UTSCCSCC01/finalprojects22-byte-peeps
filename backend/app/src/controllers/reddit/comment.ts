import { RequestHandler } from "express";
import { unknownError } from "../../globalHelpers/globalConstants";
import RedditComment from "../../models/reddit/comment";
import RedditListing from "../../models/reddit/listing";
import RedditSubreddit from "../../models/reddit/subreddit";
const { Op } = require('sequelize');
import User from "../../models/user/user";

/**
 * Provides the page number and size, provides comments of any Reddit subreddit related to the user API
 */
export const getComments: RequestHandler = async (req, res, next) => {
  try {
    if (!req.query.startDate || req.query.startDate.length !== 8
      || !req.query.endDate || req.query.endDate.length !== 8)
      return res.status(400).send();

    const user = await User.findOne({ where: { username: req.session.username }, include: RedditSubreddit });
    const pageNumber = parseInt(req.query.page?.toString() ?? '0');
    const pageSize = parseInt(req.query.pageSize?.toString() ?? '0');

    const startDateParam = req.query.startDate!.toString();
    const startYear = parseInt(startDateParam.toString().substring(0, 4));
    const startMonth = parseInt(startDateParam.toString().substring(4, 6));
    const startDay = parseInt(startDateParam.toString().substring(6, 8));
    const startDate = new Date(startYear, startMonth - 1, startDay);

    const endDateParam = req.query.endDate!.toString();
    const endYear = parseInt(endDateParam.toString().substring(0, 4));
    const endMonth = parseInt(endDateParam.toString().substring(4, 6));
    const endDay = parseInt(endDateParam.toString().substring(6, 8));
    const endDate = new Date(endYear, endMonth - 1, endDay + 1);

    if (!user?.subreddit)
      return res.send({ count: 0, data: [] });

    const listings = await RedditListing.findAll({ where: { listingId: user!.subreddit.id } });
    const listingIds: number[] = listings.map(l => l.id);
    const comments = await RedditComment.findAll({
      where: {
        listingId: listingIds,
        date: {
          [Op.between]: [startDate, endDate],
        }
      },
      order: [
        ['date', 'DESC']
      ],
      attributes: [
        'id',
        'text',
        'score',
        'replies',
        'sentimentAnalysis',
        'topicClassification',
        'subjectivityAnalysis'
      ]
    });
    const filteredComments = comments.slice(pageNumber * pageSize, pageNumber * pageSize + pageSize);
    res.send({ count: comments.length, data: filteredComments });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: unknownError });
  }
};