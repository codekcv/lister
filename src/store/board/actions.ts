import { ADD_BOARD, DELETE_BOARD } from './types';

export const addBoard = (title: string) => {
  return {
    type: ADD_BOARD,
    payload: { title }
  };
};

export const deleteBoard = (id: string) => {
  return {
    type: DELETE_BOARD,
    payload: { id }
  };
};
