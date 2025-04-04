import * as T from './types';

const initialState: T.State = 'Hello World!';

export const reducer = (state: T.State = initialState, action: T.Actions) => {
  switch (action.type) {
    case '@selectedMenu/select':
      return action.payload;
  }
  return state;
};
