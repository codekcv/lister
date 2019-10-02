import React from 'react';
import './App.css';
import { Provider } from 'react-redux';
import { configureStore } from './store/store';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Home } from './pages/Home';
import { About } from './pages/About';

const App: React.FC = () => {
  return (
    <Provider store={configureStore()}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/about" component={About} />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
