import {
  ListState,
  ListActionTypes,
  ADD_LIST,
  EDIT_LIST,
  DELETE_LIST,
  AUTOFOCUS_LIST
} from './types';
import Lists from '../../components/list/Lists';

const initialState: ListState = {
  lists: [
    {
      id: 'do',
      title: 'Do',
      autofocus: true
    },
    {
      id: 'doing',
      title: 'Doing',
      autofocus: true
    },
    {
      id: 'done',
      title: 'Done',
      autofocus: true
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
            title: action.payload.title,
            cardsID: [],
            autofocus: false
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
    case AUTOFOCUS_LIST:
      return {
        lists: state.lists.map(list => {
          list.id === action.payload.id && (list.autofocus = !list.autofocus);
          return list;
        })
      };
    default:
      return state;
  }
};
