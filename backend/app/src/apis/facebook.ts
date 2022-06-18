import axios from 'axios';

export const getPages = async (token: string): Promise<{id: string, name: string, access_token: string}[]> => {
  const result = await axios.get('https://graph.facebook.com/v14.0/me', {
     params: { access_token: token, fields: "accounts{name, access_token}" }});

  return result.data.accounts.data; 
}

export const getPageLongToken = async (pageToken: string): Promise<string> => {
  const result = await axios.get('https://graph.facebook.com/v14.0/oauth/access_token', {
    params: {
      grant_type: 'fb_exchange_token',
      client_id: '724313855458609',
      client_secret: 'b2a66793f1df4a1ce32291ba903b5218',
      fb_exchange_token: pageToken
    }
  });

  return result.data.access_token;
}