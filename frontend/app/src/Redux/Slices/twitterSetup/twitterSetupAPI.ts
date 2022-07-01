import HTTP from "../../../utils/http";

export async function fetchSettings(): Promise<{user: {id: string, username: string} | null, status: 'twitter-not-set-up' | 'active'}> {
  const response = await HTTP.get('/setup/twitter/settings');
  return response.data;
}

export async function saveUser(username: string): Promise<{user: {id: string, username: string} | null, status: 'twitter-not-set-up' | 'active', message: string}> {
  const response = await HTTP.post('/setup/twitter/connect', { username });
  return response.data;
}