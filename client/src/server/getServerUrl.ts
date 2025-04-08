export const getServerUrl = (path: string): any => {
  const host = 'http://localhost:4000';
  return [host, path].join('');
};
