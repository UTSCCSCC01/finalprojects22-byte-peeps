import axios from 'axios';

const FacebookApiUrl = 'https://graph.facebook.com/v14.0';

export const getPages = async (
  userToken: string
): Promise<{ id: string; name: string; access_token: string }[]> => {
  const url = FacebookApiUrl + '/me';
  const result = await axios.get(url, {
    params: { access_token: userToken, fields: 'accounts{name, access_token}' },
  });
  return result.data.accounts.data;
};

export const getPageLongToken = async (pageToken: string): Promise<string> => {
  const url = FacebookApiUrl + '/oauth/access_token';
  const result = await axios.get(url, {
    params: {
      grant_type: 'fb_exchange_token',
      client_id: process.env.FACEBOOK_APP_ID,
      client_secret: process.env.FACEBOOK_APP_SECRET,
      fb_exchange_token: pageToken,
    },
  });
  return result.data.access_token;
};

export const getPage = async (
  pageToken: string
): Promise<{ id: string; name: string }> => {
  const url = FacebookApiUrl + '/me';
  const result = await axios.get(url, {
    params: { access_token: pageToken, fields: 'name' },
  });
  return result.data;
};

export const getAccountPosts = async (
  accessToken: string,
  since: number,
  until: number
): Promise<any[]> => {
  const url = FacebookApiUrl + '/me/posts';
  const result = await axios
    .get(url, {
      params: {
        access_token: accessToken,
        fields: 'id,created_time,message,reactions',
        since,
        until,
      },
    })
    .catch(() => null);
  return result?.data?.data ?? null;
};

export const getPostComments = async (
  accessToken: string,
  postId: string
): Promise<any[]> => {
  const url = FacebookApiUrl + `/${postId}/comments`;
  const result = await axios
    .get(url, {
      params: {
        access_token: accessToken,
        fields: 'id,created_time,from,message,like_count',
      },
    })
    .catch(() => null);
  return result?.data?.data ?? null;
};