import type {Action} from 'redux';

export type State = string;

export type SelectMenu = Action<'@selectedMenu/select'> & {
  payload: string;
};

export type Actions = SelectMenu;
