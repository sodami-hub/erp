/*
로컬스토리지의 오브젝트를 불러오고, 저장하는 함수
외부에서 실제로 사용할 함수.
*/

import * as L from './localStorageP';

export const readObjectP = <T extends object>(key: string) =>
  new Promise<T | null>((resolve, reject) => {
    L.readStringP(key)
      .then(value => resolve(value ? JSON.parse(value) : null))
      .catch(reject);
  });

export const writeObjectP = (key: string, value: object) =>
  L.writeStringP(key, JSON.stringify(value));
