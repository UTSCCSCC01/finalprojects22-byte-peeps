import HTTP from "../../../utils/http";

export async function fetchSentimentAnalysis(startDate: string, endDate: string) {
  const response = await HTTP.get(`/facebook/comments/sentiment_analysis?start=${startDate}&end=${endDate}`);
  return response.data;
}

export async function saveCurrentPage(pageToken: string): Promise<string> {
  const response = await HTTP.post('/setup/facebook/connect', { token: pageToken });
  return response.data;
}

export async function fetchPages(token: string): Promise<{ id: string, name: string, access_token: string }[]> {
  const response = await HTTP.get('/setup/facebook/pages', { params: { token: token }});
  return response.data;
}