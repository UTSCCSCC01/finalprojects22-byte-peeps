import axios from 'axios';

const InstagramApiUrl = 'https://graph.facebook.com/v14.0';

export const getPageIdByToken = async (
  facebookPageToken: string
): Promise<string | null> => {
  const url = InstagramApiUrl + '/me';
  const result = await axios.get(url, {
    params: {
      access_token: facebookPageToken,
      fields: 'connected_instagram_account',
    },
  });
  return result.data.connected_instagram_account?.id ?? null;
};

export const getPage = async (
  facebookPageToken: string,
  id: string | null
): Promise<{ id: string; name: string } | null> => {
  if (id === null) return null;
  const url = InstagramApiUrl + `/${id}`;
  const result = await axios
    .get(url, {
      params: { access_token: facebookPageToken, fields: 'name' },
    })
    .catch(() => null);
  return result ? { id: result?.data?.id, name: result?.data?.name } : null;
};

export const getAccountMedia = async (
  accessToken: string,
  instagramAccountId: string,
  since: number,
  until: number
): Promise<any[]> => {
  const url = InstagramApiUrl + `/${instagramAccountId}/media`;
  const result = await axios
    .get(url, {
      params: {
        access_token: accessToken,
        fields: 'id,timestamp,caption,like_count,comments_count',
        since,
        until,
      },
    })
    .catch(() => null);
  return result?.data?.data ?? null;
};

export const getAccountTags = async (
  accessToken: string,
  instagramAccountId: string
): Promise<any[]> => {
  const url = InstagramApiUrl + `/${instagramAccountId}/tags`;
  const result = await axios
    .get(url, {
      params: {
        access_token: accessToken,
        fields: 'id,timestamp,username,caption,like_count,comments_count',
      },
    })
    .catch(() => null);
  return result?.data?.data ?? null;
};

export const getMediaComments = async (
  accessToken: string,
  mediaId: string
): Promise<any[]> => {
  const url = InstagramApiUrl + `/${mediaId}/comments`;
  const result = await axios
    .get(url, {
      params: {
        access_token: accessToken,
        fields: 'id,username,text,timestamp,like_count',
      },
    })
    .catch(() => null);
  return result?.data?.data ?? null;
};