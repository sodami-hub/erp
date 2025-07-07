import {getServerUrl} from './getServerUrl';

const postAndPut =
  (method: string) => (path: string, data: object, jwt?: object | null | undefined) => {
    let init: RequestInit = {
      method: method,
      body: JSON.stringify(data),
      mode: 'cors',
      credentials: 'same-origin',
      cache: 'no-cache'
    };
    if (jwt) {
      init = {
        ...init,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `${JSON.stringify(jwt)}`
        }
      };
    } else init = {...init, headers: {'Content-Type': 'application/json'}};
    return fetch(getServerUrl(path), init);
  };

export const post = postAndPut('POST');
export const put = postAndPut('PUT');
