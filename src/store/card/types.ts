interface Card {
  listId: string;
  cardId: string;
  text: string;
}

export interface CardState {
  cards: Card[];
}

export const ADD_CARD = 'ADD_CARD';
export const EDIT_CARD = 'EDIT_CARD';
export const DELETE_CARD = 'DELETE_CARD';

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

export type CardActionTypes = AddCardAction | EditCardAction | RemoveCardAction;
