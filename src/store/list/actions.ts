import { ADD_LIST, EDIT_LIST, DELETE_LIST, AUTOFOCUS_LIST } from './types';

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

export const autofocusList = (id: string, autofocus: boolean) => {
  return {
    type: AUTOFOCUS_LIST,
    payload: { id, autofocus }
  };
};
