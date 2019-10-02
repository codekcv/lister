import {
  ListState,
  ListActionTypes,
  EDIT_TITLE,
  ADD_CARD,
  EDIT_CARD,
  DELETE_CARD
} from './types';

const initialState: ListState = {
  title: 'First List',
  cards: [
    {
      id: '1',
      text: 'First Card'
    },
    {
      id: '2',
      text: 'Second Card'
    }
  ]
};

export const listReducer = (state = initialState, action: ListActionTypes) => {
  switch (action.type) {
    case EDIT_TITLE:
      return {
        ...state,
        title: action.payload.newTitle
      };
    case ADD_CARD:
      return {
        ...state,
        cards: [
          ...state.cards,
          { id: action.payload.cardID, text: action.payload.text }
        ]
      };
    case EDIT_CARD:
      return {
        ...state,
        cards: state.cards.map(card => {
          card.id === action.payload.cardID &&
            (card.text = action.payload.newText);

          return card;
        })
      };
    case DELETE_CARD:
      return {
        ...state,
        cards: state.cards.filter(card => card.id !== action.payload.cardID)
      };
    default:
      return state;
  }
};
