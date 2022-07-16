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

export type CardHeaderResponse =
  | FacebookCardResponse
  | InstagramCardResponse
  | TwitterCardResponse
  | YouTubeCardResponse
  | RedditCardResponse;

export enum CardHeaderURLRequest {
  FacebookCardHeader = '/facebook/stats/cards',
  InstagramCardHeader = '/instagram/stats/cards',
  TwitterCardHeader = '/twitter/stats/cards',
  YouTubeCardHeader = '/youtube/stats/cards',
  RedditCardHeader = '/reddit/stats/cards',
}
