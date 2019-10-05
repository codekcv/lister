import React, { useState, useRef } from 'react';
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
import Textarea from 'react-textarea-autosize';

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
  const [input, setInput] = useState<string>('');

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };

  const handleEnter = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const val = input.trim();

    if (e.key === 'Enter') {
      e.preventDefault();
      if (val) {
        addCard(listId, val);
      }
      setInput('');
    }
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
      <Textarea
        onKeyDown={handleEnter}
        placeholder="Add card..."
        onChange={handleInput}
        value={input}
      />
    </Container>
  );
};

const Container = styled.div`
  textarea {
    resize: none;
    overflow: hidden;
    width: 280px;
    padding: var(--g-padding);
    font-size: 16px;
  }
`;

const mapStateToProps = (state: AppState) => ({
  cardState: state.card
});

export default connect(
  mapStateToProps,
  { addCard, editCard, deleteCard, crossCard }
)(Cards);
