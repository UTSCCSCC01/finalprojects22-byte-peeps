import { AppNames } from '../../Redux/Slices/webApp/webAppConstants';

export const platformPostsUrls: { [app: string]: string } = {
  [AppNames.Facebook]: '/facebook/posts',
  [AppNames.Instagram]: '/instagram/media',
  [AppNames.Twitter]: '/twitter/tweets',
  [AppNames.Reddit]: '/reddit/listings',
  [AppNames.YouTube]: '/youtube/videos',
  [AppNames.GoogleReviews]: '',
  [AppNames.Yelp]: '',
  [AppNames.default]: '',
};
