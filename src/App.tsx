import React, { useState, useEffect } from 'react';
import './App.css';
import { connect } from 'react-redux';
import { AppState } from './store/store';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import { About } from './pages/About';
import { ListState } from './store/list/types';
import { CardState } from './store/card/types';
import { setCards } from './store/card/actions';

interface Props {
  list: ListState;
  card: CardState;
  setCards: typeof setCards;
}

const App: React.FC<Props> = ({ list, card, setCards }) => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/about" component={About} />
      </Switch>
    </BrowserRouter>
  );
};

const mapStateToProps = (state: AppState) => ({
  list: state.list,
  card: state.card
});

export default connect(
  mapStateToProps,
  { setCards }
)(App);
