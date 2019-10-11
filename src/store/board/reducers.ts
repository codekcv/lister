import { BoardState, BoardActionTypes, ADD_BOARD, DELETE_BOARD } from './types';

const initialState: BoardState = {
  Boards: [{ id: 'board1', title: 'Board 1' }]
};

export const boardReducer = (
  state = initialState,
  action: BoardActionTypes
) => {
  switch (action.type) {
    case ADD_BOARD:

    case DELETE_BOARD:
    default:
      return state;
  }
};
