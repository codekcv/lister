import { CardState } from '../card/types';

interface List {
  id: string;
  title: string;
}

export interface ListState {
  lists: List[];
}

export const ADD_LIST = 'ADD_LIST';
export const EDIT_LIST = 'EDIT_LIST';
export const DELETE_LIST = 'DELETE_LIST';

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

export type ListActionTypes = AddListAction | EditListAction | DeleteListAction;

// List
// export const EDIT_TITLE = 'EDIT_TEXT';

// interface EditTitleAction {
//   type: typeof EDIT_TITLE;
//   payload: { newTitle: string };
// }

// interface AddCardAction {
//   type: typeof ADD_CARD;
//   payload: { cardID: string; text: string };
// }

// interface EditCardAction {
//   type: typeof EDIT_CARD;
//   payload: { cardID: string; newText: string };
// }

// interface deleteCardAction {
//   type: typeof DELETE_CARD;
//   payload: { cardID: string };
// }

// export type ListActionTypes =
//   | EditTitleAction
//   | AddCardAction
//   | EditCardAction
//   | deleteCardAction;
