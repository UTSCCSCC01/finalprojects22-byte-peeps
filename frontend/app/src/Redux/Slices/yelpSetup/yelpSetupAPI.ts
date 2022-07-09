import HTTP from '../../../utils/http';

export async function fetchSettings(): Promise<{
  business: string | null;
  status: 'yelp-not-set-up' | 'active';
}> {
  const response = await HTTP.get('/setup/yelp/settings');
  return response.data;
}

export async function searchBusiness(params: {
  term: string;
  location: string;
}): Promise<{
  status: 'yelp-not-set-up' | 'choose-business';
  searchResults: { id: string; name: string }[] | null;
  message: string;
}> {
  const response = await HTTP.get('/setup/yelp/search', { params });
  return response.data;
}

export async function saveBusiness(business: { id: string; name: string }): Promise<{
  business: string | null;
  status: 'yelp-not-set-up' | 'active';
  message: string;
}> {
  const response = await HTTP.post('/setup/yelp/connect', { business });
  return response.data;
}
