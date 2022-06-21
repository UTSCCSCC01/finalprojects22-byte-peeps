import axios from "axios";

export const getPageIdByToken = async (facebookPageToken: string): Promise<string | null> => {
  const result = await axios.get('https://graph.facebook.com/v14.0/me', {
     params: { access_token: facebookPageToken, fields: "connected_instagram_account" }});
  return result.data.connected_instagram_account?.id ?? null; 
}

export const getPage = async (facebookPageToken: string, id: string | null): Promise<{id: string, name: string} | null> => {
  if (!id)
    return null;

  const result = await axios.get('https://graph.facebook.com/v14.0/' + id, {
     params: { access_token: facebookPageToken, fields: "name" }});
  return { id: result.data.id, name: result.data.name };
}