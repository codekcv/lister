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
  const [height, setHeight] = useState<number>(64);
  const inputRef: any = useRef(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    // e.preventDefault();
    // setInput('');
    // if () return;
    // addCard(listId, input);
  };

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setHeight(e.target.scrollHeight + 64);
    setInput(e.target.value);
  };

  const handleEnter = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const val = input.trim();
    // // console.log('kewl');
    // if (e.key !== 'Enter' || !val) return;
    // // if (e.key !== 'Enter') return;
    // setInput('');
    // setHeight(35);
    // addCard(listId, val);
    // console.log(2);

    if (e.key === 'Enter') {
      setInput('');
      if (val) {
        setHeight(35);
        addCard(listId, val);
      }
    }
  };

  return (
    <Container textHeight={height}>
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
        className="textArea"
        ref={inputRef}
        onKeyDown={handleEnter}
        name="description"
        placeholder="Add card..."
        onChange={handleInput}
        value={input}
      />
      <button
        onClick={() => {
          inputRef.current.focus();
        }}
      >
        Focis
      </button>
    </Container>
  );
};

const Container = styled.div<{ textHeight: number }>`
  input {
    /* height: 34px;
    border: none;
    border-radius: 3px;
    width: 280px;
    padding: var(--g-padding); */
    /* overflow-wrap: break-word; */

    display: block;
    font-size: 11px;
    padding: 4px 2px;
    border: solid 1px #aacfe4;
    width: 70px;
    margin: 2px 0 20px 10px;
  }

  textarea {
    resize: none;
    overflow: hidden;
    width: 280px;
    /* height: ${props => props.textHeight + 'px'}; */
    padding: var(--g-padding);
    padding: 8px;
    border: 1px pink solid;
    font-size: 16px;
    flex: 1;
  }
`;

const mapStateToProps = (state: AppState) => ({
  cardState: state.card
});

export default connect(
  mapStateToProps,
  { addCard, editCard, deleteCard, crossCard }
)(Cards);
