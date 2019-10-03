import {
  CardState,
  CardActionTypes,
  ADD_CARD,
  EDIT_CARD,
  DELETE_CARD,
  CROSS_CARD
} from './types';

const initialState: CardState = {
  cards: [
    { listId: 'do', cardId: 'c1', text: 's1', cross: false },
    { listId: 'doing', cardId: 'c2', text: 'Programming client', cross: false },
    { listId: 'done', cardId: 'c3', text: 'Redux, I think.', cross: false },
    { listId: 'done', cardId: 'c4', text: 'Remade redux', cross: false }
  ]
};

export const cardReducer = (state = initialState, action: CardActionTypes) => {
  switch (action.type) {
    case ADD_CARD:
      return {
        cards: [
          ...state.cards,
          {
            listId: action.payload.listId,
            cardId: require('short-uuid').generate(),
            text: action.payload.text,
            cross: false
          }
        ]
      };
    case EDIT_CARD:
      return {
        cards: state.cards.map(card => {
          card.cardId === action.payload.id &&
            (card.text = action.payload.text);
          return card;
        })
      };
    case DELETE_CARD:
      return {
        cards: state.cards.filter(card => card.cardId !== action.payload.id)
      };
    case CROSS_CARD:
      return {
        cards: state.cards.map(card => {
          card.cardId === action.payload.id && (card.cross = !card.cross);
          return card;
        })
      };
    default:
      return state;
  }
};
