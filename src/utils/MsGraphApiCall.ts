export async function callMsGraph(
  accessToken: string,
  url: string,
  options: RequestInit = {}
) {
  const headers = new Headers();
  const bearer = `Bearer ${accessToken}`;

  headers.append('Authorization', bearer);

  const h: any = options.headers || {};
  // eslint-disable-next-line no-restricted-syntax
  for (const key in h) {
    if (Object.prototype.hasOwnProperty.call(h, key)) {
      // eslint-disable-next-line
      const element = h[key];
      headers.append(key, element);
    }
  }

  const opts = options;
  opts.method = options?.method || 'GET';
  opts.headers = headers;

  return fetch(url, opts)
    .then(response => response.json())
    .catch(error => {
      console.error(error);
      throw error;
    });
}

export default {};
