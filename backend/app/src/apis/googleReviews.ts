import axios from 'axios';
import {
  GoogleReviewViewModel,
  GOOGLE_REVIEW_RATING_ENUMS,
} from './viewModels/googleReviews/review';

/*
  This API has been implemented without testing due to Google Reviews account verification
  limitations, endpoints have been implemented based on the following documentations:
    - https://developers.google.com/my-business/content/location-data#list_locations
    - https://developers.google.com/my-business/reference/businessinformation/rest/v1/accounts.locations/list
    - https://developers.google.com/my-business/content/review-data#get_reviews_from_multiple_locations
    - https://developers.google.com/my-business/reference/rest/v4/accounts.locations/batchGetReviews
*/

export const getLocations = async (
  bearerToken: string,
  accountId: string
): Promise<string[]> => {
  const locations: string[] = [];

  const url = `https://mybusinessbusinessinformation.googleapis.com/v1/accounts/${accountId}/locations`;
  let pageToken: string | undefined | null = null;

  while (pageToken != undefined) {
    const params: any = {
      pageSize: 100,
      readMask: 'name',
    };
    if (pageToken) params.pageToken = pageToken; // for first call to not have pageToken

    const result = await axios
      .get(url, {
        headers: { Authorization: 'Bearer ' + bearerToken },
        params: params,
      })
      .catch(() => null);

    if (!result) break;

    const currentPageLocations = result!.data.locationReviews.map(
      (l: any) => l.name
    );
    locations.push(...currentPageLocations);

    pageToken = result!.data.nextPageToken;
  }
  return locations;
};

/**
 * Retrieved general data of all reviews in addition to filtered reviews
 * @param bearerToken OAuth 2.0 token for connecting to the API
 * @param accountId Google Business Account ID
 * @param locationIds List of location ids
 * @param startDate left bound date for reviews to be retrieved
 * @param endDate right bound date for reviews to be retrieved
 * @returns a GoogleReviewWrapper containing aggregated data plus filtered reviews
 */
export const getLocationReviews = async (
  bearerToken: string,
  accountId: string,
  locationIds: string[],
  startDate: Date,
  endDate: Date
): Promise<GoogleReviewViewModel[]> => {
  const reviews: GoogleReviewViewModel[] = [];

  const url = `https://mybusiness.googleapis.com/v4/accounts/${accountId}/locations:batchGetReviews`;
  let pageToken: string | undefined | null = null;

  while (pageToken != undefined) {
    const body: any = {
      locationNames: locationIds,
      pageSize: 50,
      orderBy: 'updateTime desc',
      ignoreRatingOnlyReviews: false,
    };
    if (pageToken) body.pageToken = pageToken; // for first call to not have pageToken

    const result = await axios
      .get(url, {
        headers: { Authorization: 'Bearer ' + bearerToken },
        data: body,
      })
      .catch(() => null);

    if (!result) break;

    const currentPageReviews = result!.data.locationReviews.map((l: any) =>
      mapReviewsResponseToType(l)
    );
    reviews.push(
      ...filterReviewsByDate(currentPageReviews, startDate, endDate)
    );

    pageToken = result!.data.nextPageToken;
  }
  return reviews;
};

/**
 * Maps response reviews object to a GoogleReview type
 * @param review an any object that contains specific fields defined in the third link at the top of the document
 * @returns a GoogleReview object
 */
const mapReviewsResponseToType = (location: any): GoogleReviewViewModel => {
  return {
    id: location.review.reviewId,
    locationName: location.name,
    title: location.review.name,
    review: location.review.comment,
    reviewer:
      location.review.reviewer.displayName == ''
        ? null
        : location.review.reviewer.displayName,
    rating: GOOGLE_REVIEW_RATING_ENUMS[location.review.starRating],
    date: new Date(location.review.reviewer.updateTime),
    response: location.review.reviewReply?.comment ?? null,
  };
};

/**
 * Returns a subset of the reviews provided that are within startDate and endDate
 * @param reviews list of GoogleReview objects
 * @param startDate left interval for dates
 * @param endDate right interval for dates
 */
const filterReviewsByDate = (
  reviews: GoogleReviewViewModel[],
  startDate: Date,
  endDate: Date
): GoogleReviewViewModel[] => {
  return reviews.filter((r) => r.date > startDate && r.date < endDate);
};
