import {getServerUrl} from './getServerUrl';

const fileUploadPost = (
  path: string,
  data: FormData,
  jwt?: object | null | undefined
) => {
  let init: RequestInit = {
    method: 'POST',
    body: data,
    mode: 'cors',
    credentials: 'same-origin',
    cache: 'no-cache'
  };
  if (jwt) {
    init = {
      ...init,
      headers: {
        Accept: 'application/json',
        ContentType: 'multipart/form-data',
        Authorization: `${JSON.stringify(jwt)}`
      }
    };
  } else init = {...init, headers: {'Content-Type': 'multipart/form-data'}};
  return fetch(getServerUrl(path), init);
};

export const fileUpload = fileUploadPost;
