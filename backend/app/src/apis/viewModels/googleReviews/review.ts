export type GoogleReviewViewModel = {
  id: string;
  locationName: string;
  title: string;
  review: string;
  reviewer: string | null;
  rating: number | null;
  date: Date;
  response: string | null;
};

export const GoogleReviewRatings: Record<string, number | null> = {};
GoogleReviewRatings.STAR_RATING_UNSPECIFIED = null;
GoogleReviewRatings.ONE = 1;
GoogleReviewRatings.TWO = 2;
GoogleReviewRatings.THREE = 3;
GoogleReviewRatings.FOUR = 4;
GoogleReviewRatings.FIVE = 5;
