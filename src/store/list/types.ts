export interface List {
  id: string;
  title: string;
  autofocus: boolean;
}

export interface ListState {
  lists: List[];
}

export const ADD_LIST = 'ADD_LIST';
export const EDIT_LIST = 'EDIT_LIST';
export const DELETE_LIST = 'DELETE_LIST';
export const AUTOFOCUS_LIST = 'AUTOFOCUS_LIST';

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

interface AutofocusListAction {
  type: typeof AUTOFOCUS_LIST;
  payload: { id: string; autofocus: boolean };
}

export type ListActionTypes =
  | AddListAction
  | EditListAction
  | DeleteListAction
  | AutofocusListAction;
