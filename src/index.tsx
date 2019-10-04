import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import { configureStore } from './store/store';

const Root = () => (
  <Provider store={configureStore()}>
    <App />
  </Provider>
);

ReactDOM.render(<Root />, document.getElementById('root'));
