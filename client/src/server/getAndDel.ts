import {getServerUrl} from './getServerUrl';

const getAndDel = (method: string) => (path: string, jwt?: object | null | undefined) => {
  let headers = {'Content-Type': 'application/json'};
  let init: RequestInit = {
    method: method
  };
  if (jwt) {
    init = {
      ...init,
      headers: {...headers, Authorization: `${JSON.stringify(jwt)}`}
    };
  } else init = {...init, headers};
  return fetch(getServerUrl(path), init);
};

export const get = getAndDel('GET');
export const del = getAndDel('DELETE');
