import {
  BoardState,
  BoardActionTypes,
  ADD_BOARD,
  DELETE_BOARD,
  REORDER_BOARD,
  DRAGGING_BOARD
} from './types';

const initialState: BoardState = {
  boards: [
    { id: 'board1', title: 'Board 1' },
    { id: 'board2', title: 'Board 2' },
    { id: 'board3', title: 'Board 3' }
  ],
  dragging: false
};

export const boardReducer = (
  state = initialState,
  action: BoardActionTypes
) => {
  switch (action.type) {
    case ADD_BOARD:
      return {
        ...state,
        boards: [
          ...state.boards,
          {
            id: require('short-uuid').generate(),
            title: action.payload.title
          }
        ]
      };
    case DELETE_BOARD:
      return {
        ...state,
        boards: state.boards.filter(board => board.id !== action.payload.id)
      };
    case REORDER_BOARD:
      return {
        ...state,
        boards: action.payload.boards
      };
    case DRAGGING_BOARD:
      return {
        ...state,
        dragging: action.payload.dragging
      };
    default:
      return state;
  }
};
