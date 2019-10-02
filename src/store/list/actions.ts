import { ADD_LIST, EDIT_LIST, DELETE_LIST } from './types';

export const addList = (title: string) => {
  return {
    type: ADD_LIST,
    payload: { title }
  };
};

export const editList = (id: string, title: string) => {
  return {
    type: EDIT_LIST,
    payload: { id, title }
  };
};

export const deleteList = (id: string) => {
  return {
    type: DELETE_LIST,
    payload: { id }
  };
};

// import { EDIT_TITLE, ADD_CARD, DELETE_CARD, EDIT_CARD } from './types';

// export const editTitle = (newTitle: string) => {
//   return {
//     type: EDIT_TITLE,
//     payload: { newTitle }
//   };
// };

// export const addCard = (cardID: string, text: string) => {
//   return {
//     type: ADD_CARD,
//     payload: { cardID, text }
//   };
// };

// export const editCard = (cardID: string, newText: string) => {
//   return {
//     type: EDIT_CARD,
//     payload: { cardID, newText }
//   };
// };

// export const deleteCard = (cardID: string) => {
//   return {
//     type: DELETE_CARD,
//     payload: { cardID }
//   };
// };
