import {
  ListState,
  ListActionTypes,
  ADD_LIST,
  EDIT_LIST,
  DELETE_LIST
} from './types';

const initialState: ListState = {
  lists: [
    {
      id: 'do',
      title: 'Do'
    },
    {
      id: 'doing',
      title: 'Doing'
    },
    {
      id: 'done',
      title: 'Done'
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
            cardsID: []
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
    default:
      return state;
  }
};
