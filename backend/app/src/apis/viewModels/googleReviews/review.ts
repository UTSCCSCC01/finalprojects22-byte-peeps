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

export const GOOGLE_REVIEW_RATING_ENUMS: Record<string, number | null> = {};
GOOGLE_REVIEW_RATING_ENUMS.STAR_RATING_UNSPECIFIED = null;
GOOGLE_REVIEW_RATING_ENUMS.ONE = 1;
GOOGLE_REVIEW_RATING_ENUMS.TWO = 2;
GOOGLE_REVIEW_RATING_ENUMS.THREE = 3;
GOOGLE_REVIEW_RATING_ENUMS.FOUR = 4;
GOOGLE_REVIEW_RATING_ENUMS.FIVE = 5;
