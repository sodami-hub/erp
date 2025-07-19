export const getServerUrl = (path: string): string => {
  const prefix = path.split('/')[1];
  let host = '';
  switch (prefix) {
    case 'auth':
      host = 'http://localhost:8081';
      break;
    case 'staff':
      host = 'http://localhost:8081';
      break;
    case 'staffs':
      host = 'http://localhost:8081';
      break;
    case 'beneficiary':
      host = 'http://localhost:8082';
      break;
    case 'beneficiaries':
      host = 'http://localhost:8082';
      break;
  }
  return [host, path].join('');
};
