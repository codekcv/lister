import { combineReducers, createStore } from 'redux';
import { listReducer } from './list/reducers';
import { cardReducer } from './card/reducers';

const rootReducer = combineReducers({
  list: listReducer,
  card: cardReducer
});

export const configureStore = () => {
  const store = createStore(rootReducer);

  return store;
};

export type AppState = ReturnType<typeof rootReducer>;
