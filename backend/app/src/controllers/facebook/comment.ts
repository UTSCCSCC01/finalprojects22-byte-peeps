import { RequestHandler } from 'express';
import FacebookComment from '../../models/facebook/comment';
const { Op } = require("sequelize");

/**
 * Provides the 50 most recent Facebook comments
 */
export const getComments: RequestHandler = async (req, res, next) => {
  const comments = await FacebookComment.findAll({
    order: [['date', 'DESC']],
    limit: 50,
  });
  res.send(comments);
};

/**
 * Provides the 50 most recent Facebook comments belonging to the provided Media
 */
export const getCommentsByPostId: RequestHandler = async (req, res, next) => {
  const comments = await FacebookComment.findAll({
    where: { postId: req.params['postId'] },
    order: [['date', 'DESC']],
    limit: 50,
  });
  res.send(comments);
};

/**
 * Provides the % of comments that are labeled as subjective
 */
export const getCommentsSubjectivityAnalysis: RequestHandler = async (
  req,
  res,
  next
) => {
  const subjective = await FacebookComment.count({
    where: { subjectivityAnalysis: 'subjective' },
  });
  const objective = await FacebookComment.count({
    where: { subjectivityAnalysis: 'objective' },
  });
  res.send({
    'subjective': subjective,
    'objective': objective
  });
};

/**
 * Provides the % of comments that are labeled as positive, negative and neutral
 */
export const getCommentsSentimentAnalysis: RequestHandler = async (
  req,
  res,
  next
) => {
  const startDateParam = req.query.start;
  const endDateParam = req.query.end;
  
  let startDate: Date;
  let endDate: Date;

  if (startDateParam && endDateParam) {
    if (startDateParam.length === 8 && endDateParam.length === 8) {
      // parse
      const year = parseInt((startDateParam.toString()).substring(0, 4));
      const month = parseInt((startDateParam.toString()).substring(4, 6));
      const day = parseInt((startDateParam.toString()).substring(6, 8));

      const year_end = parseInt((endDateParam.toString()).substring(0, 4));
      const month_end = parseInt((endDateParam.toString()).substring(4, 6));
      const day_end = parseInt((endDateParam.toString()).substring(6, 8));

      try {
        startDate = new Date(year, month - 1, day);
        endDate = new Date(year_end, month_end - 1, day_end + 1);
        console.log(startDate, endDate);
        const positive = await FacebookComment.count({
          where: { 
            sentimentAnalysis: 'positive', 
            date: {
              [Op.between]: [startDate, endDate]
            }
          },
        });
        const neutral = await FacebookComment.count({
          where: { 
            sentimentAnalysis: 'neutral',
            date: {
              [Op.between]: [startDate, endDate]
            }
          },
        });
        const negative = await FacebookComment.count({
          where: { 
            sentimentAnalysis: 'negative', 
            date: {
              [Op.between]: [startDate, endDate]
            }
          },
        });
        res.send({
          'positive': positive,
          'neutral': neutral,
          'negative': negative,
        });
      } catch (error) {
        // throw new Error("Invalid Date Input");
        res.status(404).send("Date Input not Provided");
      }
    }
  }else {
    res.status(404).send("Invalid Date Input");
  }
};
