export interface Board {
  id: string;
  title: string;
}

export interface BoardState {
  boards: Board[];
  dragging: boolean;
}

export const ADD_BOARD = 'ADD_BOARD';
export const DELETE_BOARD = 'DELETE_BOARD';
export const REORDER_BOARD = 'REORDER_BOARD';
export const DRAGGING_BOARD = 'DRAGGING_BOARD';

interface AddBoardAction {
  type: typeof ADD_BOARD;
  payload: { title: string };
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

export type BoardActionTypes =
  | AddBoardAction
  | DeleteBoardAction
  | ReorderBoardAction
  | DraggingBoardAction;
