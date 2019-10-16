import {
  ADD_BOARD,
  DELETE_BOARD,
  REORDER_BOARD,
  Board,
  DRAGGING_BOARD,
  SHOW_ALL_BOARD,
  CURRENT_BOARD,
  EDIT_BOARD,
  FOCUS_BOARD,
  CHANGE_COLOR
} from './types';

export const addBoard = (title: string) => {
  return {
    type: ADD_BOARD,
    payload: { title }
  };
};

export const editBoard = (boardId: string, title: string) => {
  return {
    type: EDIT_BOARD,
    payload: { boardId, title }
  };
};

export const deleteBoard = (boardId: string) => {
  return {
    type: DELETE_BOARD,
    payload: { boardId }
  };
};

export const reorderBoard = (boards: Board[]) => {
  return {
    type: REORDER_BOARD,
    payload: { boards }
  };
};

export const draggingBoard = (dragging: boolean) => {
  return { type: DRAGGING_BOARD, payload: { dragging } };
};

export const showAllBoard = (showAll: boolean) => {
  return { type: SHOW_ALL_BOARD, payload: { showAll } };
};

export const setCurrentBoard = (board: Board) => {
  return { type: CURRENT_BOARD, payload: { board } };
};

export const setFocusBoard = (boardId: string, autofocus: boolean) => {
  return { type: FOCUS_BOARD, payload: { boardId, autofocus } };
};

export const changeBackgroundColor = (color: string) => {
  return { type: CHANGE_COLOR, payload: { color } };
};
