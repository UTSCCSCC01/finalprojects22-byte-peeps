import HTTP from "../../../utils/http";

export async function fetchSettings(): Promise<{subreddit: string | null, status: 'reddit-not-set-up' | 'active'}> {
  const response = await HTTP.get('/setup/reddit/settings');
  return response.data;
}

export async function saveSubreddit(subreddit: string): Promise<{subreddit: string | null, status: 'reddit-not-set-up' | 'active', message: string}> {
  const response = await HTTP.post('/setup/reddit/connect', { subreddit });
  return response.data;
}