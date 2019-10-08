import { AppState } from './store';

const DATA_NAME = 'state';

export const saveState = (state: AppState) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(DATA_NAME, serializedState);
  } catch (err) {
    return undefined;
  }
};

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem(DATA_NAME);
    return serializedState ? JSON.parse(serializedState) : {};
  } catch (err) {
    return undefined;
  }
};
