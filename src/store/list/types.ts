export interface List {
  id: string;
  title: string;
  autofocus: boolean;
  adding: boolean;
}

export interface ListState {
  lists: List[];
}

export const ADD_LIST = 'ADD_LIST';
export const EDIT_LIST = 'EDIT_LIST';
export const DELETE_LIST = 'DELETE_LIST';
export const FOCUS_LIST = 'AUTOFOCUS_LIST';
export const ADDING = 'ADDING';

interface AddListAction {
  type: typeof ADD_LIST;
  payload: { title: string };
}

interface EditListAction {
  type: typeof EDIT_LIST;
  payload: { id: string; title: string };
}

interface DeleteListAction {
  type: typeof DELETE_LIST;
  payload: { id: string };
}

interface FocusListAction {
  type: typeof FOCUS_LIST;
  payload: { id: string; autofocus: boolean };
}

interface CurrentlyAddingAction {
  type: typeof ADDING;
  payload: { id: string; adding: boolean };
}

export type ListActionTypes =
  | AddListAction
  | EditListAction
  | DeleteListAction
  | FocusListAction
  | CurrentlyAddingAction;
