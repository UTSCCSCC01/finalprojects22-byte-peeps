import e, { RequestHandler } from 'express';
import * as api from '../../apis/yelp';
import YelpBusiness from '../../models/yelp/business';
import YelpReview from '../../models/yelp/review';
import User from '../../models/user/user';

export const getSettings: RequestHandler = async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: { username: req.session.username },
      include: [YelpBusiness],
    });

    if (user?.yelpBusiness == undefined) {
      return res.send({
        status: 'yelp-not-set-up',
        business: null,
      });
    }

    return res.send({
      status: 'active',
      business: user.yelpBusiness.name,
    });
  } catch (err) {
    return res.status(500).send(err);
  }
};

export const searchBusiness: RequestHandler = async (req, res, next) => {
  try {
    const term = req.query.term?.toString() ?? '';
    const location = req.query.location?.toString() ?? '';
    const rawSearchResults = await api.searchBusiness(term, location);
    const status = rawSearchResults ? 'choose-business' : 'yelp-not-set-up';
    const message = rawSearchResults
      ? 'Please select your business'
      : "The business you provided doesn't exist";
    const searchResults = rawSearchResults
      ? rawSearchResults.map((result: any) => {
        return { id: result.id, name: result.name }
      })
      : null;

    return res.send({ status, searchResults, message });
  } catch (err) {
    return res.status(500).send(err);
  }
};

export const connectBusiness: RequestHandler = async (req, res, next) => {
  try {
    let returnBusiness = null;
    const newBusinessId = req.body.business.id;
    const newBusinessName = req.body.business.name;

    const user = await User.findOne({
      where: { username: req.session.username },
      include: [YelpBusiness],
    });

    // Existing setup
    if (user?.yelpBusiness != undefined) {
      // If business is same as existing, return
      if (user.yelpBusiness.businessId == newBusinessId) {
        return res.status(200).send({
          status: 'active',
          business: user.yelpBusiness.name,
          message: 'This business is already connected!',
        });
      }

      // Destroy associated data
      await YelpReview.destroy({
        where: { businessId: user.yelpBusiness.id },
      });
      await user.yelpBusiness.destroy();

      // Check if new business already exists
      const existingYelpBusiness = await YelpBusiness.findOne({
        where: { businessId: newBusinessId },
        paranoid: false,
      });

      // New user already exists
      if (existingYelpBusiness) {
        await existingYelpBusiness.restore();
        await YelpReview.restore({
          where: { businessId: existingYelpBusiness.id },
        });
        returnBusiness = existingYelpBusiness.name;
      }
    }

    // Business doesn't exist yet
    if (returnBusiness === null) {
      // Create business
      await YelpBusiness.create({
        businessId: newBusinessId,
        name: newBusinessName,
        userId: user!.id,
      });

      returnBusiness = newBusinessName;
    }

    return res.status(200).send({
      status: 'active',
      business: returnBusiness,
      message: 'Yelp business has been connected successfully!',
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
};
