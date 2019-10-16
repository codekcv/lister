import {
  CardState,
  CardActionTypes,
  ADD_CARD,
  EDIT_CARD,
  DELETE_CARD,
  CROSS_CARD,
  SET_CARDS,
  INIT_CARD,
  CHANGE_LIST
} from './types';

const initialState: CardState = {
  cards: [
    {
      listId: 'do',
      cardId: 'c2',
      text: 'You can edit or delete me',
      cross: false,
      init: true
    },
    {
      listId: 'do',
      cardId: 'c3',
      text:
        'You can also drag cards; move it around even across different lists.',
      cross: false,
      init: true
    },
    {
      listId: 'do',
      cardId: 'c4',
      text:
        'State is automatically saved locally. If you refresh, changes will persist. You can use the clear button to delete the save.',
      cross: false,
      init: true
    },

    {
      listId: 'do',
      cardId: 'c49',
      text: 'You can also click a card to cross it off.',
      cross: false,
      init: true
    }
  ]
};

export const cardReducer = (state = initialState, action: CardActionTypes) => {
  switch (action.type) {
    case SET_CARDS:
      return {
        cards: action.payload.cards
      };
    case ADD_CARD:
      return {
        cards: [
          ...state.cards,
          {
            listId: action.payload.listId,
            cardId: require('short-uuid').generate(),
            text: '',
            cross: false,
            init: false
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
    case INIT_CARD:
      return {
        cards: state.cards.map(card => {
          card.cardId === action.payload.id && (card.init = !card.init);
          return card;
        })
      };
    case CHANGE_LIST:
      return {
        cards: state.cards.map(card => {
          card.cardId === action.payload.id &&
            (card.listId = action.payload.listId);
          return card;
        })
      };
    default:
      return state;
  }
};
