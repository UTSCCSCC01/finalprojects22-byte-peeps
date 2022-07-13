import axios from 'axios';

/*
  This API has been implemented without testing due to Google Reviews account verification
  limitations, endpoints have been implemented based on the following documentations:
    - https://developers.google.com/my-business/content/review-data#list_all_reviews
    - https://developers.google.com/my-business/reference/rest/v4/accounts.locations.reviews/list
    - https://developers.google.com/my-business/reference/rest/v4/accounts.locations.reviews#Review
*/

type GoogleReview = {
  id: string;
  title: string;
  review: string;
  reviewer: string | null;
  rating: number | null;
  date: Date;
  reply: string | null;
};

const BASE_URL = 'https://mybusiness.googleapis.com/v4';

const RATING_ENUMS: Record<string, number | null> = {};
RATING_ENUMS.STAR_RATING_UNSPECIFIED = null;
RATING_ENUMS.ONE = 1;
RATING_ENUMS.TWO = 2;
RATING_ENUMS.THREE = 3;
RATING_ENUMS.FOUR = 4;
RATING_ENUMS.FIVE = 5;

export const getAllReviews = async (
  bearerToken: string,
  accountId: string,
  locationId: string
): Promise<{
  totalReviewCount: number;
  averageRating: number;
  reviews: GoogleReview[];
}> => {
  const reviews: GoogleReview[] = [];
  let averageRating = 0;
  let totalReviewCount = 0;

  const url = `${BASE_URL}/accounts/${accountId}/locations/${locationId}/reviews`;
  let pageToken: string | undefined | null = null;

  while (pageToken != undefined) {
    const params: any = { pageSize: 50 };
    if (pageToken) params.pageToken = pageToken; // for first call to not have pageToken

    const result = await axios
      .get(url, {
        headers: { Authorization: 'Bearer ' + bearerToken },
        params: params,
      })
      .catch(() => null);

    if (!result) break;

    reviews.push(
      ...result!.data.reviews.map((r: any) => {
        r.reviewId;
        r.name;
        r.comment;
        r.reviewer.displayName == '' ? null : r.reviewer.displayName;
        RATING_ENUMS[r.starRating];
        new Date(r.reviewer.updateTime);
        r.reviewReply?.comment ?? null;
      })
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
