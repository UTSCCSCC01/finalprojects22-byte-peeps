import { RequestHandler } from 'express';
import { Op, Sequelize } from 'sequelize';
import { invalidDateRangeResponse } from '../../globalHelpers/globalConstants';
import { getDates } from '../../globalHelpers/globalHelpers';
import { keywordExtraction } from '../../middlewares/keywordExtraction';
import User from '../../models/user/user';
import YelpBusiness from '../../models/yelp/business';
import YelpReview from '../../models/yelp/review';

export const getWordCloudData: RequestHandler = async (req, res, next) => {
  try {
    const startDateParam = req.query.startDate?.toString();
    const endDateParam = req.query.endDate?.toString();

    const { startDate, endDate } = getDates(startDateParam, endDateParam);

    if (!startDate || !endDate)
      return res.status(400).send(invalidDateRangeResponse);

    const user = await User.findOne({
      where: { username: req.session.username },
      include: YelpBusiness,
    });

    if (!user?.yelpBusiness)
      return res.send({
        totalReviews: null,
        avgReview: null,
      });

    const comments = await await YelpReview.findAll({
      where: {
        date: {
          [Op.between]: [startDate, endDate],
        },
        businessId: user!.yelpBusiness.id,
      },
      attributes: ['text'], //need to double check
    });

    function getText(acc: string, comment: { text: string }) {
      return acc.concat(' ', comment.text);
    }
    const getKeywords = comments.reduce(getText, ' ');
    res.send(keywordExtraction(getKeywords));
  } catch (e) {
    next(e);
  }
};
