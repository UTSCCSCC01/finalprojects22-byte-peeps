import axios from 'axios';

export const getSubreddit = async (
  subreddit: string
): Promise<string | null> => {
  const bearer = process.env.TWITTER_APP_BEARER_TOKEN ?? '';
  const result = await axios
    .get('https://www.reddit.com/r/' + subreddit + '/new.json')
    .catch(() => null);
  return (
    result?.data?.kind &&
    result.data.kind == 'Listing' &&
    result.data.data.dist !== 0
  );
};
