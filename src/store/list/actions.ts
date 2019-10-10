import {
  ADD_LIST,
  EDIT_LIST,
  DELETE_LIST,
  FOCUS_LIST,
  ADDING,
  CHANGE_ORDER,
  List
} from './types';

export const addList = (title: string) => {
  return {
    type: ADD_LIST,
    payload: { title }
  };
};

export const editList = (id: string, title: string) => {
  return {
    type: EDIT_LIST,
    payload: { id, title }
  };
};

export const deleteList = (id: string) => {
  return {
    type: DELETE_LIST,
    payload: { id }
  };
};

export const focusList = (id: string, autofocus: boolean) => {
  return {
    type: FOCUS_LIST,
    payload: { id, autofocus }
  };
};

export const currentlyAdding = (id: string, adding: boolean) => {
  return {
    type: ADDING,
    payload: { id, adding }
  };
};

export const changeOrder = (lists: List[]) => {
  return {
    type: CHANGE_ORDER,
    payload: { lists }
  };
};
