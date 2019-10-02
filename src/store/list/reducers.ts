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

// import {
//   ListState,
//   ListActionTypes,
//   EDIT_TITLE,
//   ADD_CARD,
//   EDIT_CARD,
//   DELETE_CARD
// } from './types';

// const initialState: ListState = {
//   title: 'First List',
//   cardy: [
//     {
//       id: '1',
//       text: 'First Card'
//     },
//     {
//       id: '2',
//       text: 'Second Card'
//     }
//   ]
// };

// export const listReducer = (state = initialState, action: ListActionTypes) => {
//   switch (action.type) {
//     case EDIT_TITLE:
//       return {
//         ...state,
//         title: action.payload.newTitle
//       };
//     case ADD_CARD:
//       return {
//         ...state,
//         cards: [
//           ...state.cardy,
//           { id: action.payload.cardID, text: action.payload.text }
//         ]
//       };
//     case EDIT_CARD:
//       return {
//         ...state,
//         cards: state.cardy.map(card => {
//           card.id === action.payload.cardID &&
//             (card.text = action.payload.newText);

//           return card;
//         })
//       };
//     case DELETE_CARD:
//       return {
//         ...state,
//         cards: state.cardy.filter(card => card.id !== action.payload.cardID)
//       };
//     default:
//       return state;
//   }
// };
