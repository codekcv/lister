import {
  BoardState,
  BoardActionTypes,
  ADD_BOARD,
  DELETE_BOARD,
  REORDER_BOARD,
  DRAGGING_BOARD,
  SHOW_ALL_BOARD,
  CURRENT_BOARD,
  EDIT_BOARD,
  FOCUS_BOARD,
  CHANGE_COLOR
} from './types';

const initialState: BoardState = {
  boards: [
    { boardId: 'personal', title: 'Personal', autofocus: true },
    { boardId: 'work', title: 'Work', autofocus: true }
  ],
  dragging: false,
  showAll: false,
  currentBoard: { boardId: 'personal', title: 'Personal', autofocus: true },
  backgroundColor: 'MediumSeaGreen'
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
            boardId: generatedId,
            title: action.payload.title,
            autofocus: false
          }
        ],
        currentBoard: {
          boardId: generatedId,
          title: action.payload.title,
          autofocus: false
        }
      };
    case EDIT_BOARD:
      return {
        ...state,
        boards: state.boards.map(board => {
          board.boardId === action.payload.boardId &&
            (board.title = action.payload.title);
          return board;
        })
      };
    case DELETE_BOARD:
      const board = state.boards.find(
        board => board.boardId === action.payload.boardId
      );
      let index = state.boards.findIndex(item => item === board) + 1;
      index === state.boards.length && (index = 0);

      return {
        ...state,
        boards: state.boards.filter(
          board => board.boardId !== action.payload.boardId
        ),
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
      return {
        ...state,
        currentBoard: state.boards.filter(
          board => board === action.payload.board
        )[0]
      };
    case FOCUS_BOARD:
      return {
        ...state,
        boards: state.boards.map(board => {
          board.boardId === action.payload.boardId && (board.autofocus = true);
          return board;
        })
      };
    case CHANGE_COLOR:
      return {
        ...state,
        backgroundColor: action.payload.color
      };
    default:
      return state;
  }
};
