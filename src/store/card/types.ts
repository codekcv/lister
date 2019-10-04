export interface Card {
  listId: string;
  cardId: string;
  text: string;
  cross: boolean;
}

export interface CardState {
  cards: Card[];
}

export const SET_CARDS = 'SET_CARD';
export const ADD_CARD = 'ADD_CARD';
export const EDIT_CARD = 'EDIT_CARD';
export const DELETE_CARD = 'DELETE_CARD';
export const CROSS_CARD = 'CROSS_CARD';

interface SetCardAction {
  type: typeof SET_CARDS;
  payload: { cards: Card[] };
}

interface AddCardAction {
  type: typeof ADD_CARD;
  payload: { listId: string; text: string };
}

interface EditCardAction {
  type: typeof EDIT_CARD;
  payload: { id: string; text: string };
}

interface RemoveCardAction {
  type: typeof DELETE_CARD;
  payload: { id: string };
}

interface CrossCardAction {
  type: typeof CROSS_CARD;
  payload: { id: string };
}

export type CardActionTypes =
  | SetCardAction
  | AddCardAction
  | EditCardAction
  | RemoveCardAction
  | CrossCardAction;
