import {combineReducers} from 'redux';
import * as SM from './selectedMenu';

export const rootReducer = combineReducers({
  selectedMenu: SM.reducer
});
