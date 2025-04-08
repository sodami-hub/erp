/*
localStorage 에 쓰기와 읽기
내부적으로 사용
 */

export const readItemFromStorageP = (key: string) =>
  new Promise<string | null>(async (resolve, reject) => {
    try {
      const value = localStorage.getItem(key);
      resolve(value);
    } catch (e) {
      reject(e);
    }
  });

export const writeItemToStorageP = (key: string, value: string) =>
  new Promise<string>(async (resolve, reject) => {
    try {
      localStorage.setItem(key, value);
      resolve(value);
    } catch (e) {
      reject(e);
    }
  });

export const readStringP = readItemFromStorageP;
export const writeStringP = writeItemToStorageP;
