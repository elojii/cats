const headers = new Headers({
    "Content-Type": "application/json",
    "x-api-key": process.env.CAT_API_KEY as string,
  });
  
export const requestOptions = {
    method: "GET",
    headers: headers,
    redirect: "follow" as RequestRedirect,
    cache: "no-store" as RequestCache,
  };