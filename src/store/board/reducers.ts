import {
  BoardState,
  BoardActionTypes,
  ADD_BOARD,
  DELETE_BOARD,
  REORDER_BOARD
} from './types';

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
    case DELETE_BOARD:
      return state;
    case REORDER_BOARD:
      return {
        boards: action.payload.boards
      };
    default:
      return state;
  }
};
