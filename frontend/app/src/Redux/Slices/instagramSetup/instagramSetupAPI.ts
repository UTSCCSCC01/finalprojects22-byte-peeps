export async function fetchSettings(): Promise<{page: {id: string, name: string} | null, connectedPageId: string | null, status: 'fb-not-set-up' | 'ig-not-set-up' | 'active' | 'inactive'}> {
  return new Promise<{page: {id: string, name: string} | null, connectedPageId: string | null, status: 'fb-not-set-up' | 'ig-not-set-up' | 'active' | 'inactive'}>((resolve) =>
    setTimeout(() => resolve({
      page: { id: "1", name: "UTSC Repository" },
      connectedPageId: "1",
      status: "active"
    }), 1000)
  );
}

export async function savePage(): Promise<void> {
  return new Promise<void>((resolve) =>
    setTimeout(() => resolve(), 2000)
  );
}