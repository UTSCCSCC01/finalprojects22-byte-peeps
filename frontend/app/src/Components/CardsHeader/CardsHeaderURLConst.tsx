type FacebookCardResponse = {
  totalPosts?: number;
  totalReactions: number;
  totalComments: number;
};

type InstagramCardResponse = {
  totalPosts?: number;
  totalLikes: number;
  totalComments: number;
  totalTags: number;
};

type TwitterCardResponse = {
  totalTweets?: number;
  totalLikes: number;
  totalReplies: number;
  totalRetweets: number;
};

type YouTubeCardResponse = {
  totalVideos?: number;
  totalViews: number;
  totalLikes: number;
  totalComments: number;
};

type RedditCardResponse = {
  totalListings?: number;
  avgScore: number;
  totalComments: number;
};

type YelpCardResponse = {
  totalReviews: number;
  avgReview: number;
};

type GoogleReviewsCardResponse = {
  totalReviews: number;
  avgReview: number;
};

type OverviewCardResponse = {
  totalPosts: number;
  totalLikes: number;
  totalMentions: number;
  avgReview: number;
};

export type CardHeaderResponse =
  | FacebookCardResponse
  | InstagramCardResponse
  | TwitterCardResponse
  | YouTubeCardResponse
  | RedditCardResponse
  | YelpCardResponse
  | GoogleReviewsCardResponse
  | OverviewCardResponse;

export enum CardHeaderURLRequest {
  FacebookCardHeader = '/facebook/stats/cards',
  InstagramCardHeader = '/instagram/stats/cards',
  TwitterCardHeader = '/twitter/stats/cards',
  YouTubeCardHeader = '/youtube/stats/cards',
  RedditCardHeader = '/reddit/stats/cards',
  YelpCardHeader = '/yelp/stats/cards',
  GoogleReviewsCardHeader = '/googleReviews/stats/cards',
  OverviewCardHeader = '/overview/stats/cards',
}
