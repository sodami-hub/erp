import type * as T from './types';

export const ChangeMenu = (payload: T.State) => ({
  type: '@selectedMenu/select',
  payload
});
