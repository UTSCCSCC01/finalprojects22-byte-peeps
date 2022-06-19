import HTTP from "../../../utils/http";

export async function fetchCurrentPage(): Promise<{id: string, name: string} | boolean> {
  const response = await HTTP.get('/setup/facebook/page');
  return response.data;
}

export async function saveCurrentPage(name: string, pageToken: string): Promise<string> {
  const response = await HTTP.post('/setup/facebook/connect', { name: name, token: pageToken });
  return response.data;
}

export async function fetchPages(token: string): Promise<{ id: string, name: string, access_token: string }[]> {
  const response = await HTTP.get('/setup/facebook/pages', { params: { token: token }});
  return response.data;
}