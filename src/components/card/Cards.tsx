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
import { CardLi } from './Card';
import Textarea from 'react-textarea-autosize';
import styled from 'styled-components';

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
      setInput('');
      val && addCard(listId, val);
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
      <div className="textarea-container">
        <Textarea
          className="add-card-textarea"
          value={input}
          placeholder="Add card..."
          onChange={handleInput}
          onKeyDown={handleEnter}
        />
      </div>
    </Container>
  );
};

const Container = styled.div`
  textarea {
    font-size: 1rem;
  }

  .textarea-container {
    margin: var(--g-margin) 0;
    /* padding: var(--g-padding); */
    width: auto;
  }

  .add-card-textarea {
    width: 100%;
    padding: calc(var(--g-padding) * 2);
    border: 1px rgba(255, 255, 255, 0.5) solid;
  }
`;

const mapStateToProps = (state: AppState) => ({
  cardState: state.card
});

export default connect(
  mapStateToProps,
  { addCard, editCard, deleteCard, crossCard }
)(Cards);
