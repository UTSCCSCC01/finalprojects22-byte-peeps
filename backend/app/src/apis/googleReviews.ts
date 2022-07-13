import axios from 'axios';

/*
  This API has been implemented without testing due to Google Reviews account verification
  limitations, endpoints have been implemented based on the following documentations:
    - https://developers.google.com/my-business/content/review-data#list_all_reviews
    - https://developers.google.com/my-business/reference/rest/v4/accounts.locations.reviews/list
    - https://developers.google.com/my-business/reference/rest/v4/accounts.locations.reviews#Review
*/

const BASE_URL = 'https://mybusiness.googleapis.com/v4';

export const getAllReviews = async (
  bearerToken: string,
  accountId: string,
  locationId: string
): Promise<{
  totalReviewCount: number;
  averageRating: number;
  reviews: {
    id: string;
    title: string;
    review: string;
    reviewer: string | null;
    rating: number;
    date: Date;
    reply: string | null;
  }[];
}> => {
  const reviews: any[] = [];
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

    if (result) {
      reviews.push(...result!.data.reviews);
      if (!pageToken) {
        // add these values only in first iteration
        totalReviewCount = result!.data.totalReviewCount;
        averageRating = result!.data.averageRating;
      }
    }
  }
  return { totalReviewCount, averageRating, reviews };
};
