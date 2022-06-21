export async function fetchSettings(): Promise<{pages: {id: string, name: string}[], currentId: string | null, status: 'fb-not-set-up' | 'ig-not-set-up' | 'active' | 'inactive'}> {
  return new Promise<{pages: {id: string, name: string}[], currentId: string | null, status: 'fb-not-set-up' | 'ig-not-set-up' | 'active' | 'inactive'}>((resolve) =>
    setTimeout(() => resolve({
      pages: [
        { id: "1", name: "UTSC Repository" },
        { id: "2", name: "Nike" }
      ],
      currentId: "2",
      status: "ig-not-set-up"
    }), 1000)
  );
}

export async function saveCurrentPage(id: string): Promise<void> {
  return new Promise<void>((resolve) =>
    setTimeout(() => resolve(), 2000)
  );
}