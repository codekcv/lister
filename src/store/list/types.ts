interface Cards {
  id: string;
  text: string;
}

export interface ListState {
  title: string;
  cards: Cards[];
}

// List
export const EDIT_TITLE = 'EDIT_TEXT';

// Card
export const ADD_CARD = 'ADD_CARD';
export const EDIT_CARD = 'EDIT_CARD';
export const DELETE_CARD = 'DELETE_CARD';

interface EditTitleAction {
  type: typeof EDIT_TITLE;
  payload: { newTitle: string };
}

interface AddCardAction {
  type: typeof ADD_CARD;
  payload: { cardID: string; text: string };
}

interface EditCardAction {
  type: typeof EDIT_CARD;
  payload: { cardID: string; newText: string };
}

interface deleteCardAction {
  type: typeof DELETE_CARD;
  payload: { cardID: string };
}

export type ListActionTypes =
  | EditTitleAction
  | AddCardAction
  | EditCardAction
  | deleteCardAction;
