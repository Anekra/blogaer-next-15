export default async function getClientFetch(url: string) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_ROUTE}${url}`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json"
    }
  });

  return await response.json();
}
