export interface Board {
  id: string;
  title: string;
}

export interface BoardState {
  boards: Board[];
}

export const ADD_BOARD = 'ADD_BOARD';
export const DELETE_BOARD = 'DELETE_BOARD';

interface AddBoardAction {
  type: typeof ADD_BOARD;
  payload: { title: string };
}

interface DeleteBoardAction {
  type: typeof DELETE_BOARD;
  payload: { id: string };
}

export type BoardActionTypes = AddBoardAction | DeleteBoardAction;
