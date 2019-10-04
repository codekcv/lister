import React, { useState } from 'react';
import { connect } from 'react-redux';
import { CardState } from '../../store/card/types';
import {
  addCard,
  crossCard,
  deleteCard,
  editCard
} from '../../store/card/actions';
import { AppState } from '../../store/store';
import styled from 'styled-components';
import { CardLi } from './Card';

interface Props {
  listId: string;
  cardState: CardState;
  addCard: typeof addCard;
  editCard: typeof editCard;
  deleteCard: typeof deleteCard;
  crossCard: typeof crossCard;
}

const Cards: React.FC<Props> = ({
  listId,
  cardState,
  addCard,
  editCard,
  deleteCard,
  crossCard
}) => {
  const listCards = cardState.cards.filter(card => card.listId === listId);
  const [input, setInput] = useState('');

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setInput(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setInput('');
    if (!input.trim()) return;
    addCard(listId, input);
  };

  return (
    <Container>
      <ul>
        {listCards.map(card => (
          <li key={card.cardId}>
            <CardLi
              card={card}
              editCard={editCard}
              deleteCard={deleteCard}
              crossCard={crossCard}
            />
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Add card..."
          value={input}
          onChange={handleInput}
        />
        {/* <button type="submit">Add</button> */}
      </form>
    </Container>
  );
};

const Container = styled.div`
  input {
    height: 34px;
    border: none;
    border-radius: 3px;
    width: 280px;
    padding: var(--g-padding);
  }
`;

const mapStateToProps = (state: AppState) => ({
  cardState: state.card
});

export default connect(
  mapStateToProps,
  { addCard, editCard, deleteCard, crossCard }
)(Cards);
