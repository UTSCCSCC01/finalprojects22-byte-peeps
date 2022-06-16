// A mock function to mimic making an async request for data
export function fetchActive() {
  return new Promise<{ data: boolean }>((resolve) =>
    setTimeout(() => resolve({ data: false }), 2000)
    // TODO: Check if active
  );
}