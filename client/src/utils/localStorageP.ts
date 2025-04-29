/*
localStorage 에 쓰기와 읽기
 */

export const readItemFromStorage = (key: string) => {
  return localStorage.getItem(key);
};

export const writeItemToStorage = (key: string, value: string) => {
  localStorage.setItem(key, value);
};

export const readStringP = readItemFromStorage;
export const writeStringP = writeItemToStorage;
