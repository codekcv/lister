import { EDIT_TITLE, ADD_CARD, DELETE_CARD, EDIT_CARD } from './types';

export const editTitle = (newTitle: string) => {
  return {
    type: EDIT_TITLE,
    payload: { newTitle }
  };
};

// export const removeList = (listID: string) => {
//   return {
//     type: REMOVE_LIST,
//     payload: { listID }
//   };
// };

export const addCard = (cardID: string, text: string) => {
  return {
    type: ADD_CARD,
    payload: { cardID, text }
  };
};

export const editCard = (cardID: string, newText: string) => {
  return {
    type: EDIT_CARD,
    payload: { cardID, newText }
  };
};

export const deleteCard = (cardID: string) => {
  return {
    type: DELETE_CARD,
    payload: { cardID }
  };
};
