/*
로컬스토리지의 오브젝트를 불러오고, 저장하는 함수
오브젝트 타입을 스트링으로 파싱해서 localStorageP 호출
*/

import * as L from './localStorageP';

export const readObject = (key: string) => {
  const readData = L.readStringP(key);
  if (!readData) {
    return null;
  }
  return JSON.parse(readData);
};

export const writeObject = (key: string, value: object) =>
  L.writeStringP(key, JSON.stringify(value));
