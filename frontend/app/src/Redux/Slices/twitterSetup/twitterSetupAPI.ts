import HTTP from '../../../utils/http';

export async function fetchSettings(): Promise<{
  username: string | null;
  status: 'twitter-not-set-up' | 'active';
}> {
  const response = await HTTP.get('/setup/twitter/settings');
  return response.data;
}

export async function saveUsername(username: string): Promise<{
  username: string | null;
  status: 'twitter-not-set-up' | 'active';
  message: string;
}> {
  const response = await HTTP.post('/setup/twitter/connect', { username });
  return response.data;
}

export async function populateFirstTime(): Promise<string> {
  const response = await HTTP.post('/setup/twitter/populate');
  return response.data;
}
