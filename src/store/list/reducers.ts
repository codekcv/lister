import {
  ListState,
  ListActionTypes,
  ADD_LIST,
  EDIT_LIST,
  DELETE_LIST,
  FOCUS_LIST,
  ADDING,
  CHANGE_ORDER
} from './types';

const initialState: ListState = {
  lists: [
    {
      id: 'do',
      boardId: 'board1',
      title: 'Sample List',
      autofocus: true,
      adding: false
    },
    {
      id: 'doing',
      boardId: 'board1',
      title: 'Things To Do',
      autofocus: true,
      adding: false
    },
    {
      id: 'done',
      boardId: 'board1',
      title: 'Random Facts',
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
            id: require('short-uuid').generate(),
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
          list.id === action.payload.id && (list.title = action.payload.title);
          return list;
        })
      };
    case DELETE_LIST:
      return {
        lists: state.lists.filter(list => list.id !== action.payload.id)
      };
    case FOCUS_LIST:
      return {
        lists: state.lists.map(list => {
          list.id === action.payload.id && (list.autofocus = !list.autofocus);
          return list;
        })
      };
    case ADDING:
      return {
        lists: state.lists.map(list => {
          list.id === action.payload.id &&
            (list.adding = action.payload.adding);
          return list;
        })
      };
    case CHANGE_ORDER:
      return {
        lists: action.payload.lists
      };
    default:
      return state;
  }
};
