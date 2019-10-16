export interface List {
  listId: string;
  boardId: string;
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
export const CHANGE_ORDER = 'CHANGE_ORDER';
export const CHANGE_BOARD = 'CHANGE_BOARD';

interface AddListAction {
  type: typeof ADD_LIST;
  payload: { boardId: string; title: string };
}

interface EditListAction {
  type: typeof EDIT_LIST;
  payload: { listId: string; title: string };
}

interface DeleteListAction {
  type: typeof DELETE_LIST;
  payload: { listId: string };
}

interface FocusListAction {
  type: typeof FOCUS_LIST;
  payload: { listId: string; autofocus: boolean };
}

interface CurrentlyAddingAction {
  type: typeof ADDING;
  payload: { listId: string; adding: boolean };
}

interface ChangeOrderAction {
  type: typeof CHANGE_ORDER;
  payload: { lists: List[] };
}

interface ChangeBoardAction {
  type: typeof CHANGE_BOARD;
  payload: { listId: string; boardId: string };
}

export type ListActionTypes =
  | AddListAction
  | EditListAction
  | DeleteListAction
  | FocusListAction
  | CurrentlyAddingAction
  | ChangeOrderAction
  | ChangeBoardAction;
