import HTTP from "../../../utils/http";

export async function fetchSettings(): Promise<{page: {id: string, name: string} | null, connectedPageId: string | null, status: 'fb-not-set-up' | 'ig-not-set-up' | 'active' | 'inactive'}> {
  const response = await HTTP.get('/setup/instagram/settings');
  return response.data;
}

export async function savePage(): Promise<void> {
  return new Promise<void>((resolve) =>
    setTimeout(() => resolve(), 2000)
  );
}