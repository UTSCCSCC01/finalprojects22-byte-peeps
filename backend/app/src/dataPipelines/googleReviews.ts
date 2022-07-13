import { CronJob } from 'cron';
import {
  getReviews,
  GoogleReviewViewModel,
  GoogleReviewWrapperViewModel,
} from '../apis/googleReviews';
import GoogleReviewsLocation from '../models/googleReviews/location';
import GoogleReviewsReview from '../models/googleReviews/review';

/**
 * Updates the database as follows:
 *    1. Gets all Google Reviews locations stored in the db
 *    2. For each location:
 *        a. Fetches all reviews created on the previous day.
 */
async function startPipeline() {
  try {
    /* Get stored Google Review locations */
    let locations = await GoogleReviewsLocation.findAll();
    if (locations.length == 0) return;

    /* Get boundary dates */
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const today = new Date();

    /* Update data for each location */
    locations.forEach(async (location) => {
      await updateLocationReviews(location, today, yesterday);
    });
  } catch (err) {
    console.log(err);
  }
}

/**
 * Uses the Google Business Profile APIs to fetch and store information related
 * to reviews belonging to the provided location
 * @param location the GoogleReviewsLocation object to update associated valeus of
 * @param startDate left bound of reviews' last updated date
 * @param endDate right bound of reviews' last updated date
 */
async function updateLocationReviews(
  location: GoogleReviewsLocation,
  startDate: Date,
  endDate: Date
) {
  /* Perform request */
  const data: GoogleReviewWrapperViewModel = await getReviews(
    location.token,
    location.accountId,
    location.locationId,
    startDate,
    endDate
  );

  /* Update aggregated data */
  location.averageRating = data.averageRating;
  location.numReviews = data.totalReviewCount;
  await location.save();

  /* Update reviews */
  data.reviews.forEach(async (review: GoogleReviewViewModel) => {
    GoogleReviewsReview.findOne({
      where: { reviewId: review.id },
    }).then(function (obj) {
      if (obj) {
        obj.update({
          title: review.title,
          review: review.review,
          rating: review.rating,
          response: review.response,
          date: review.date,
        });
      } else {
        GoogleReviewsReview.create({
          title: review.title,
          review: review.review,
          reviewer: review.reviewer,
          rating: review.rating,
          response: review.response,
          date: review.date,
          reviewId: review.id,
          location: location.id,
        });
      }
    });
  });
}

/**
 * Cron Job to run the Google Reviews update script on a daily basis
 */
export const googleReviewsScheduledJob = new CronJob(
  '0 0 * * *', // Daily
  startPipeline,
  null,
  false,
  'America/Toronto'
);
