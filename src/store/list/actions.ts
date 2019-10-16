import {
  ADD_LIST,
  EDIT_LIST,
  DELETE_LIST,
  FOCUS_LIST,
  ADDING,
  CHANGE_ORDER,
  List,
  CHANGE_BOARD
} from './types';

export const addList = (boardId: string, title: string) => {
  return {
    type: ADD_LIST,
    payload: { boardId, title }
  };
};

export const editList = (listId: string, title: string) => {
  return {
    type: EDIT_LIST,
    payload: { listId, title }
  };
};

export const deleteList = (listId: string) => {
  return {
    type: DELETE_LIST,
    payload: { listId }
  };
};

export const focusList = (listId: string, autofocus: boolean) => {
  return {
    type: FOCUS_LIST,
    payload: { listId, autofocus }
  };
};

export const currentlyAdding = (listId: string, adding: boolean) => {
  return {
    type: ADDING,
    payload: { listId, adding }
  };
};

export const changeOrder = (lists: List[]) => {
  return {
    type: CHANGE_ORDER,
    payload: { lists }
  };
};

export const changeBoard = (listId: string, boardId: string) => {
  return {
    type: CHANGE_BOARD,
    payload: { listId, boardId }
  };
};
