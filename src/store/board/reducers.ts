import { BoardState, BoardActionTypes, ADD_BOARD, DELETE_BOARD } from './types';

const initialState: BoardState = {
  boards: [
    { id: 'board1', title: 'Board 1' },
    { id: 'board2', title: 'Board 2' },
    { id: 'board3', title: 'Board 3' }
  ]
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
