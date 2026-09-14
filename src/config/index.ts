export const EnvConfig = {
  client_url: process.env.NEXT_PUBLIC_CLIENT_BASE_URL,
  socket_url: process.env.NEXT_PUBLIC_SOCKET,
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
  serverBaseUrl : process.env.SERVER_BASE_API,
  serverRootUrl : process.env.SERVER_ROOT,
  MAP_KEY : process.env.NEXT_PUBLIC_MAP_KEY,
  hasSSL : process.env.HAS_SSL
};
