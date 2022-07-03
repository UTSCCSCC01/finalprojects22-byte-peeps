import axios from 'axios';

export const getPages = async (
  userToken: string
): Promise<{ id: string; name: string; access_token: string }[]> => {
  const result = await axios.get('https://graph.facebook.com/v14.0/me', {
    params: { access_token: userToken, fields: 'accounts{name, access_token}' },
  });
  return result.data.accounts.data;
};

export const getPageLongToken = async (pageToken: string): Promise<string> => {
  const result = await axios.get(
    'https://graph.facebook.com/v14.0/oauth/access_token',
    {
      params: {
        grant_type: 'fb_exchange_token',
        client_id: process.env.FACEBOOK_APP_ID,
        client_secret: process.env.FACEBOOK_APP_SECRET,
        fb_exchange_token: pageToken,
      },
    }
  );
  return result.data.access_token;
};

export const getPage = async (
  pageToken: string
): Promise<{ id: string; name: string }> => {
  const result = await axios.get('https://graph.facebook.com/v14.0/me', {
    params: { access_token: pageToken, fields: 'name' },
  });
  return result.data;
};
