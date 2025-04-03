import type {Action} from 'redux';

export type State = string;

export type ChangeMenu = Action<'@selectedMenu/change'> & {
  payload: string;
};

export type Actions = ChangeMenu;
