export const getServerUrl = (path: string): any => {
  const host = 'http://localhost:8081';
  return [host, path].join('');
};
