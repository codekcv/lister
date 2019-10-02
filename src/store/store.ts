import { combineReducers, createStore } from 'redux';
import { listReducer } from './list/reducers';

const rootReducer = combineReducers({
  list: listReducer
});

export const configureStore = () => {
  const store = createStore(rootReducer);

  return store;
};

export type AppState = ReturnType<typeof rootReducer>;
