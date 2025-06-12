export const getServerUrl = (path: string): string => {
  const prefix = path.split('/')[1];
  let host = '';
  switch (prefix) {
    case 'staff' || 'staffs':
      host = 'http://localhost:8081';
      break;
    case 'beneficiary' || 'beneficiaries':
      host = 'http://localhost:8082';
  }
  return [host, path].join('');
};
