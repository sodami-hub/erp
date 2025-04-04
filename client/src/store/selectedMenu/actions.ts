import type * as T from './types';

export const ChangeMenu = (payload: T.SelectMenu) => ({
  type: '@selectedMenu/select',
  payload
});
