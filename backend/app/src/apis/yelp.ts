import axios from 'axios';

export const searchBusiness = async (term: string, location: string): Promise<any> => {
  const bearer = process.env.YELP_API_KEY ?? '';
  const result = await axios
    .get('https://api.yelp.com/v3/businesses/search?term=' + term + '&location=' + location, {
      headers: { Authorization: 'Bearer ' + bearer },
    })
    .catch(() => null);
  return result?.data?.businesses ?? null;
};
