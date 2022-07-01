import HTTP from "../../../utils/http";

export async function fetchSettings(): Promise<{channel: string | null, status: 'youtube-not-set-up' | 'active'}> {
  const response = await HTTP.get('/setup/youtube/settings');
  return response.data;
}

export async function saveChannel(channel: string): Promise<{channel: string | null, status: 'youtube-not-set-up' | 'active', message: string}> {
  const response = await HTTP.post('/setup/youtube/connect', { channel });
  return response.data;
}