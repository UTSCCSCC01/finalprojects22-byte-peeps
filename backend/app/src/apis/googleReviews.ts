import axios from 'axios';

/*
  This API has been implemented without testing due to Google Reviews account verification
  limitations, endpoints have been implemented based on the following documentations:
    - https://developers.google.com/my-business/content/review-data#list_all_reviews
    - https://developers.google.com/my-business/reference/rest/v4/accounts.locations.reviews/list
    - https://developers.google.com/my-business/reference/rest/v4/accounts.locations.reviews#Review
*/

export type GoogleReviewWrapperViewModel = {
  totalReviewCount: number;
  averageRating: number;
  reviews: GoogleReviewViewModel[];
};

export type GoogleReviewViewModel = {
  id: string;
  title: string;
  review: string;
  reviewer: string | null;
  rating: number | null;
  date: Date;
  response: string | null;
};

const BASE_URL = 'https://mybusiness.googleapis.com/v4';

const RATING_ENUMS: Record<string, number | null> = {};
RATING_ENUMS.STAR_RATING_UNSPECIFIED = null;
RATING_ENUMS.ONE = 1;
RATING_ENUMS.TWO = 2;
RATING_ENUMS.THREE = 3;
RATING_ENUMS.FOUR = 4;
RATING_ENUMS.FIVE = 5;

/**
 * Retrieved general data of all reviews in addition to filtered reviews
 * @param bearerToken OAuth 2.0 token for connecting to the API
 * @param accountId Google Business Account ID
 * @param locationId Location ID to retrieve data from
 * @param startDate left bound date for reviews to be retrieved
 * @param endDate right bound date for reviews to be retrieved
 * @returns a GoogleReviewWrapper containing aggregated data plus filtered reviews
 */
export const getReviews = async (
  bearerToken: string,
  accountId: string,
  locationId: string,
  startDate: Date,
  endDate: Date
): Promise<GoogleReviewWrapperViewModel> => {
  const reviews: GoogleReviewViewModel[] = [];
  let averageRating = 0;
  let totalReviewCount = 0;

  const url = `${BASE_URL}/accounts/${accountId}/locations/${locationId}/reviews`;
  let pageToken: string | undefined | null = null;

  while (pageToken != undefined) {
    const params: any = { pageSize: 50, orderBy: 'updateTime desc' };
    if (pageToken) params.pageToken = pageToken; // for first call to not have pageToken

    const result = await axios
      .get(url, {
        headers: { Authorization: 'Bearer ' + bearerToken },
        params: params,
      })
      .catch(() => null);

    if (!result) break;

    const currentPageReviews = result!.data.reviews.map((r: any) =>
      mapReviewsResponseToType(r)
    );
    reviews.push(
      ...filterReviewsByDate(currentPageReviews, startDate, endDate)
    );

    if (!pageToken) {
      // add these values only in first iteration
      totalReviewCount = result!.data.totalReviewCount;
      averageRating = result!.data.averageRating;
    }
    pageToken = result!.data.nextPageToken;
  }
  return { totalReviewCount, averageRating, reviews };
};

/**
 * Maps response reviews object to a GoogleReview type
 * @param review an any object that contains specific fields defined in the third link at the top of the document
 * @returns a GoogleReview object
 */
const mapReviewsResponseToType = (review: any): GoogleReviewViewModel => {
  return {
    id: review.reviewId,
    title: review.name,
    review: review.comment,
    reviewer:
      review.reviewer.displayName == '' ? null : review.reviewer.displayName,
    rating: RATING_ENUMS[review.starRating],
    date: new Date(review.reviewer.updateTime),
    response: review.reviewReply?.comment ?? null,
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
