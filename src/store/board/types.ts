export interface Board {
  id: string;
  title: string;
}

export interface BoardState {
  boards: Board[];
  dragging: boolean;
  showAll: boolean;
  currentBoard: Board;
}

export const ADD_BOARD = 'ADD_BOARD';
export const EDIT_BOARD = 'EDIT_BOARD';
export const DELETE_BOARD = 'DELETE_BOARD';
export const REORDER_BOARD = 'REORDER_BOARD';
export const DRAGGING_BOARD = 'DRAGGING_BOARD';
export const SHOW_ALL_BOARD = 'SHOW_ALL_BOARD';
export const CURRENT_BOARD = 'CURRENT_BOARD';

interface AddBoardAction {
  type: typeof ADD_BOARD;
  payload: { title: string };
}

interface EditBoardAction {
  type: typeof EDIT_BOARD;
  payload: { id: string; title: string };
}

interface DeleteBoardAction {
  type: typeof DELETE_BOARD;
  payload: { id: string };
}

interface ReorderBoardAction {
  type: typeof REORDER_BOARD;
  payload: { boards: Board[] };
}

interface DraggingBoardAction {
  type: typeof DRAGGING_BOARD;
  payload: { dragging: boolean };
}

interface ShowAllBoardAction {
  type: typeof SHOW_ALL_BOARD;
  payload: { showAll: boolean };
}

interface SET_CURRENT_BOARD {
  type: typeof CURRENT_BOARD;
  payload: { board: Board };
}

export type BoardActionTypes =
  | AddBoardAction
  | EditBoardAction
  | DeleteBoardAction
  | ReorderBoardAction
  | DraggingBoardAction
  | ShowAllBoardAction
  | SET_CURRENT_BOARD;
