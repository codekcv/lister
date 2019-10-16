export interface Board {
  boardId: string;
  title: string;
  autofocus: boolean;
}

export interface BoardState {
  boards: Board[];
  dragging: boolean;
  showAll: boolean;
  currentBoard: Board;
  backgroundColor: string;
}

export const ADD_BOARD = 'ADD_BOARD';
export const EDIT_BOARD = 'EDIT_BOARD';
export const DELETE_BOARD = 'DELETE_BOARD';
export const REORDER_BOARD = 'REORDER_BOARD';
export const DRAGGING_BOARD = 'DRAGGING_BOARD';
export const SHOW_ALL_BOARD = 'SHOW_ALL_BOARD';
export const CURRENT_BOARD = 'CURRENT_BOARD';
export const FOCUS_BOARD = 'FOCUS_BOARD';
export const CHANGE_COLOR = 'CHANGE_COLOR';

interface AddBoardAction {
  type: typeof ADD_BOARD;
  payload: { title: string };
}

interface EditBoardAction {
  type: typeof EDIT_BOARD;
  payload: { boardId: string; title: string };
}

interface DeleteBoardAction {
  type: typeof DELETE_BOARD;
  payload: { boardId: string };
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

interface SetCurrentBoardAction {
  type: typeof CURRENT_BOARD;
  payload: { board: Board };
}

interface SetFocusBoardAction {
  type: typeof FOCUS_BOARD;
  payload: { boardId: string; autofocus: boolean };
}

interface ChangeColorAction {
  type: typeof CHANGE_COLOR;
  payload: { color: string };
}

export type BoardActionTypes =
  | AddBoardAction
  | EditBoardAction
  | DeleteBoardAction
  | ReorderBoardAction
  | DraggingBoardAction
  | ShowAllBoardAction
  | SetCurrentBoardAction
  | SetFocusBoardAction
  | ChangeColorAction;
