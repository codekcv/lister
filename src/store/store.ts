import { combineReducers, createStore } from 'redux';
import { listReducer } from './list/reducers';
import { cardReducer } from './card/reducers';
import { loadState, saveState } from './state';

const rootReducer = combineReducers({
  list: listReducer,
  card: cardReducer
});

export const configureStore = () => {
  const persistedStore = loadState();
  const store = createStore(rootReducer, persistedStore);

  store.subscribe(() => {
    saveState(store.getState());
  });
  return store;
};

export type AppState = ReturnType<typeof rootReducer>;
