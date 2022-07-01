import axios from "axios";

export const getUserId = async (username: string): Promise<string | null> => {
  const bearer = process.env.TWITTER_APP_BEARER_TOKEN ?? '';
  const result = await axios.get('https://api.twitter.com/2/users/by/username/' + username, {
    headers: { Authorization: 'Bearer ' + bearer }
  }).catch(() => null);
  return result?.data?.data?.id ?? null; 
}