export async function fetchSettings(): Promise<{page: string | null, connectedPage: string | null, status: 'fb-not-set-up' | 'ig-not-set-up' | 'active' | 'inactive'}> {
  return new Promise<{page: string | null, connectedPage: string | null, status: 'fb-not-set-up' | 'ig-not-set-up' | 'active' | 'inactive'}>((resolve) =>
    setTimeout(() => resolve({
      page: "UTSC Repository",
      connectedPage: "UTSC Repository",
      status: "ig-not-set-up"
    }), 1000)
  );
}

export async function savePage(): Promise<void> {
  return new Promise<void>((resolve) =>
    setTimeout(() => resolve(), 2000)
  );
}