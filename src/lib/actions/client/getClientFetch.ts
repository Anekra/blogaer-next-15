export default async function getClientFetch(url: string) {
  const response = await fetch(url, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json"
    }
  });

  return await response.json();
}
