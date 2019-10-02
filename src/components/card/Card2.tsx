import React, { useState } from 'react';
import { connect } from 'react-redux';
import { CardState } from '../../store/card/types';
import { addCard, editCard, deleteCard } from '../../store/card/actions';
import { AppState } from '../../store/store';
import styled from 'styled-components';

interface Props {
  listId: string;
  cardState: CardState;
  addCard: typeof addCard;
  editCard: typeof editCard;
  deleteCard: typeof deleteCard;
}

const Card2: React.FC<Props> = ({
  listId,
  cardState,
  addCard,
  editCard,
  deleteCard
}) => {
  const [input, setInput] = useState('');
  const listCards = cardState.cards.filter(card => card.listId === listId);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setInput(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input) {
      addCard(listId, input);
      setInput('');
    }
  };

  return (
    <Container>
      <ul>
        {listCards.map(card => (
          <li key={card.cardId}>{card.text}</li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Add card..."
          value={input}
          onChange={handleInput}
        />
        <button type="submit">Add</button>
      </form>
    </Container>
  );
};

const Container = styled.div``;

const mapStateToProps = (state: AppState) => ({
  cardState: state.card
});

export default connect(
  mapStateToProps,
  { addCard, editCard, deleteCard }
)(Card2);
