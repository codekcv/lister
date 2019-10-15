import {
  BoardState,
  BoardActionTypes,
  ADD_BOARD,
  DELETE_BOARD,
  REORDER_BOARD,
  DRAGGING_BOARD,
  SHOW_ALL_BOARD,
  CURRENT_BOARD,
  EDIT_BOARD
} from './types';

const initialState: BoardState = {
  boards: [
    { id: 'board1', title: 'Board 1' },
    { id: 'board2', title: 'Board 2' },
    { id: 'board3', title: 'Board 3' }
  ],
  dragging: false,
  showAll: false,
  currentBoard: { id: 'board1', title: 'Board 1' }
};

export const boardReducer = (
  state = initialState,
  action: BoardActionTypes
) => {
  switch (action.type) {
    case ADD_BOARD:
      const generatedId = require('short-uuid').generate();
      return {
        ...state,
        boards: [
          ...state.boards,
          {
            id: generatedId,
            title: action.payload.title
          }
        ],
        currentBoard: {
          id: generatedId,
          title: action.payload.title
        }
      };
    case EDIT_BOARD:
      return {
        ...state,
        boards: state.boards.map(board => {
          board.id === action.payload.id &&
            (board.title = action.payload.title);
          return board;
        })
      };
    case DELETE_BOARD:
      const board = state.boards.find(board => board.id === action.payload.id);
      let index = state.boards.findIndex(item => item === board) + 1;
      index === state.boards.length && (index = 0);

      return {
        ...state,
        boards: state.boards.filter(board => board.id !== action.payload.id),
        currentBoard: state.boards[index]
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
    case SHOW_ALL_BOARD:
      return {
        ...state,
        showAll: action.payload.showAll
      };
    case CURRENT_BOARD:
      console.log('red', action.payload.board);

      return {
        ...state,
        currentBoard: state.boards.filter(
          board => board === action.payload.board
        )[0]
      };
    default:
      return state;
  }
};
