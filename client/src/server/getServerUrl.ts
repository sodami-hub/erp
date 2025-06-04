export const getServerUrl = (path: string): string => {
  const host = 'http://localhost:8081';
  return [host, path].join('');
};
