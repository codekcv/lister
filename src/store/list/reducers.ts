import {
  ListState,
  ListActionTypes,
  ADD_LIST,
  EDIT_LIST,
  DELETE_LIST,
  FOCUS_LIST,
  ADDING,
  CHANGE_ORDER,
  CHANGE_BOARD
} from './types';

const initialState: ListState = {
  lists: [
    {
      listId: 'do',
      boardId: 'personal',
      title: 'Things To Do',
      autofocus: true,
      adding: false
    },
    {
      listId: 'doing',
      boardId: 'personal',
      title: 'Currently Doing',
      autofocus: true,
      adding: false
    },
    {
      listId: 'done',
      boardId: 'personal',
      title: 'Done With It',
      autofocus: true,
      adding: false
    }
  ]
};

export const listReducer = (state = initialState, action: ListActionTypes) => {
  switch (action.type) {
    case ADD_LIST:
      return {
        lists: [
          ...state.lists,
          {
            listId: require('short-uuid').generate(),
            boardId: action.payload.boardId,
            title: action.payload.title,
            cardsID: [],
            autofocus: false,
            adding: false
          }
        ]
      };
    case EDIT_LIST:
      return {
        lists: state.lists.map(list => {
          list.listId === action.payload.listId &&
            (list.title = action.payload.title);
          return list;
        })
      };
    case DELETE_LIST:
      return {
        lists: state.lists.filter(list => list.listId !== action.payload.listId)
      };
    case FOCUS_LIST:
      return {
        lists: state.lists.map(list => {
          list.listId === action.payload.listId &&
            (list.autofocus = !list.autofocus);
          return list;
        })
      };
    case ADDING:
      return {
        lists: state.lists.map(list => {
          list.listId === action.payload.listId &&
            (list.adding = action.payload.adding);
          return list;
        })
      };
    case CHANGE_ORDER:
      return {
        lists: action.payload.lists
      };
    case CHANGE_BOARD:
      return {
        lists: state.lists.map(list => {
          list.listId === action.payload.listId &&
            (list.boardId = action.payload.boardId);
          return list;
        })
      };
    default:
      return state;
  }
};
