export function fetchSettings() {
  // TODO: Retrieve pages or null if no authentication
  return new Promise<{ currentPage: string, pages: { name: string, value: string }[] } | null>((resolve) =>
    // setTimeout(() => resolve(null), 2000)
    setTimeout(() => resolve({
      currentPage: "456",
      pages: [{name: "Xperience", value: "123"}, {name: "Test", value: "456"}]
    }), 2000)
  );
}

export function saveCurrentPage(page: string) {
  // TODO: Save current page
  return new Promise<boolean>((resolve) => 
    setTimeout(() => resolve(true), 2000)
  );
}