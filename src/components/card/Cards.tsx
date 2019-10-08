import React, { useState } from 'react';
import { connect } from 'react-redux';
import { CardState } from '../../store/card/types';
import {
  addCard,
  crossCard,
  deleteCard,
  editCard,
  initCard
} from '../../store/card/actions';
import { AppState } from '../../store/store';
import { CardLi } from './Card';
import Textarea from 'react-textarea-autosize';
import styled from 'styled-components';
import { currentlyAdding } from '../../store/list/actions';

interface Props {
  listId: string;
  cardState: CardState;
  addCard: typeof addCard;
  editCard: typeof editCard;
  deleteCard: typeof deleteCard;
  crossCard: typeof crossCard;
  initCard: typeof initCard;
  currentlyAdding: typeof currentlyAdding;
  adding: boolean;
}

const Cards: React.FC<Props> = ({
  listId,
  cardState,
  addCard,
  editCard,
  deleteCard,
  crossCard,
  initCard,
  currentlyAdding,
  adding
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

  const handleClick = () => {
    addCard(listId, 'hi');
    currentlyAdding(listId, true);
    // adding(listId, true);
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
              initCard={initCard}
              currentlyAdding={currentlyAdding}
            />
          </li>
        ))}
      </ul>
      <div className="textarea-container">
        {/* <Textarea
          className="add-card-textarea"
          value={input}
          placeholder="Add card..."
          onChange={handleInput}
          onKeyDown={handleEnter}
        /> */}
        {!adding && <button onClick={handleClick}>+ Add a card</button>}
      </div>
    </Container>
  );
};

const Container = styled.div`
  button {
    width: 100%;
    background: none;
    /* background: lightgray; */
    border: none;
    border-radius: 3px;
    height: 30px;
    /* padding-bottom: -1px; */
    margin: 0;
    padding: 0;
    margin-bottom: 1px;
    color: gray;
  }
  button:hover {
    background: lightgray;
    /* background: white; */
    /* border: 1px blue solid; */
    text-decoration: underline;
  }

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
  { addCard, editCard, deleteCard, crossCard, initCard }
)(Cards);
