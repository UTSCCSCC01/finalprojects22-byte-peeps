import { CronJob } from 'cron';
import { getLocations, getLocationReviews } from '../apis/googleReviews';
import { GoogleReviewViewModel } from '../apis/viewModels/googleReviews/review';
import DatumBoxAPICall from '../middlewares/datumBox/datumBox';
import { DatumAPICallResult } from '../middlewares/datumBox/datumBoxTypes';
import GoogleReviewsAccount from '../models/googleReviews/account';
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
    const accounts = await GoogleReviewsAccount.findAll({
      include: GoogleReviewsLocation,
    });

    /* Get boundary dates */
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const today = new Date();

    /* Update data for each account */
    accounts.forEach(async (account) => {
      /* Update reviews */
      const locationIds = await getLocations(account.token, account.accountId);
      await updateLocationReviews(account.id, locationIds, today, yesterday);
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
  accountId: string,
  locationIds: string[],
  startDate: Date,
  endDate: Date
) {
  const account = await GoogleReviewsAccount.findOne({
    where: { id: accountId },
    include: GoogleReviewsLocation,
  });

  /* Perform request */
  const data = await getLocationReviews(
    account!.token,
    account!.id,
    locationIds,
    startDate,
    endDate
  );

  /* Iterate through all location reviews retrieved */
  for (let i = 0; i < data.length; i++) {
    const review = data[i];
    const textAnalysis: DatumAPICallResult = await DatumBoxAPICall(
      review.review
    );

    /* Add location if doesnt exist */
    let location = await GoogleReviewsLocation.findOne({
      where: { locationId: review.locationName },
    });
    if (!location) {
      location = await GoogleReviewsLocation.create({
        locationId: review.locationName,
        accountId: accountId,
      });
    }

    /* Add review or update */
    GoogleReviewsReview.upsert({
      title: review.title,
      review: review.review,
      reviewer: review.reviewer,
      rating: review.rating,
      response: review.response,
      date: review.date,
      reviewId: review.id, // unique key
      location: location!.id,
      sentimentAnalysis: textAnalysis.SentimentAnalysis,
      subjectivityAnalysis: textAnalysis.SubjectivityAnalysis,
      topicClassification: textAnalysis.TopicClassification,
    });
  }
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
