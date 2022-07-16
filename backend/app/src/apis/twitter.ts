import axios from 'axios';

const TwitterApiUrl = 'https://api.twitter.com/2';

export const getUserId = async (username: string): Promise<string | null> => {
  const bearer = process.env.TWITTER_APP_BEARER_TOKEN ?? '';
  const url = TwitterApiUrl + '/users/by/username/' + username;
  const result = await axios
    .get(url, { headers: { Authorization: 'Bearer ' + bearer } })
    .catch(() => null);
  return result?.data?.data?.id ?? null;
};

export const getUserTweets = async (
  userId: string,
  startTime: string,
  endTime: string
): Promise<any[]> => {
  const bearer = process.env.TWITTER_APP_BEARER_TOKEN ?? '';
  const url = TwitterApiUrl + `/users/${userId}/tweets`;
  const result = await axios
    .get(url, {
      headers: { Authorization: 'Bearer ' + bearer },
      params: {
        'tweet.fields': 'created_at,conversation_id,public_metrics',
        start_time: startTime,
        end_time: endTime,
      },
    })
    .catch(() => null);
  return result?.data?.data ?? null;
};

export const getTweetConversation = async (
  conversationId: string
): Promise<any[]> => {
  const bearer = process.env.TWITTER_APP_BEARER_TOKEN ?? '';
  const url = TwitterApiUrl + '/tweets/search/recent';
  const result = await axios
    .get(url, {
      headers: { Authorization: 'Bearer ' + bearer },
      params: {
        query: `conversation_id:${conversationId}`,
        'tweet.fields': 'created_at,public_metrics',
      },
    })
    .catch(() => null);
  return result?.data?.data ?? null;
};
