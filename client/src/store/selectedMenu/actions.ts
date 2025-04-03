import type * as T from './types';

export const changeMenu = (payload: T.ChangeMenu) => ({
  type: '@selectedMenu/change',
  payload
});
