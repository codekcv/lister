import React, { useState } from 'react';
import {
  crossCard,
  editCard,
  deleteCard,
  initCard
} from '../../store/card/actions';
import { Card, CardState } from '../../store/card/types';
import styled from 'styled-components';
import { FaPencilAlt, FaTrashAlt } from 'react-icons/fa';
import Textarea from 'react-textarea-autosize';
import { currentlyAdding } from '../../store/list/actions';
import { Draggable } from 'react-beautiful-dnd';
import { connect } from 'react-redux';
import { AppState } from '../../store/store';

interface Props {
  card: Card;
  cardState: CardState;
  editCard: typeof editCard;
  deleteCard: typeof deleteCard;
  crossCard: typeof crossCard;
  initCard: typeof initCard;
  currentlyAdding: typeof currentlyAdding;
  index: number;
}

const CardLi: React.FC<Props> = ({
  card,
  cardState,
  editCard,
  deleteCard,
  crossCard,
  initCard,
  currentlyAdding,
  index
}) => {
  const { listId, cardId, text, cross, init } = cardState.cards[
    cardState.cards.indexOf(card)
  ];

  //=== Container === \\
  const [editing, setEditing] = useState(false);

  //=== Button ===\\
  const handleDone = () => {
    crossCard(cardId);
    console.log();
  };
  const handleDeleteCard = () => {
    deleteCard(cardId);
  };

  const handleEditText = () => {
    setEditing(true);
    setInput(text);
    handleDone();
  };

  //=== Text Area ===\\
  const [input, setInput] = useState('');

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };

  const handleEnter = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit(input);
    }
  };

  const handleSubmit = (title: string) => {
    title.trim() ? editCard(cardId, title) : deleteCard(cardId);
    setEditing(false);
    currentlyAdding(listId, false);
  };

  const handleFocus = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    const temp_value = e.target.value;
    e.target.value = '';
    e.target.value = temp_value;
  };

  const handleBlur = () => {
    handleSubmit(input);
  };

  if (!init) {
    initCard(cardId, true);
    setInput('');
    setEditing(true);
  }

  return (
    <Draggable draggableId={cardId} index={index} type="card">
      {provided => (
        <Container
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          isCross={cross}
          isEdit={editing}
        >
          {!editing ? (
            <div className="textDiv" onClick={handleDone}>
              <p className="text">{text}</p>
              <i className="card-button">
                <FaPencilAlt onClick={handleEditText} />{' '}
                <FaTrashAlt onClick={handleDeleteCard} />
              </i>
            </div>
          ) : (
            <div className="card-textarea-container">
              <Textarea
                className="card-textarea"
                value={input}
                placeholder="Edit card..."
                onChange={handleInput}
                onKeyDown={handleEnter}
                onFocus={handleFocus}
                onBlur={handleBlur}
                autoFocus
              />
            </div>
          )}
        </Container>
      )}
    </Draggable>
  );
};

interface Styled {
  isEdit: boolean;
  isCross: boolean;
}

const Container = styled.div<Styled>`
  background: white;
  width: auto;
  border-radius: 3px;
  box-shadow: 0 2px lightgray;
  margin-bottom: calc(var(--g-margin) * 2);
  cursor: pointer;

  :hover {
    background: #ebecf0;
  }

  .textDiv {
    position: relative;
    margin-bottom: calc(var(--g-margin));
    padding: 8px;
    width: auto;

    :hover {
      .card-button {
        display: block;
      }
    }
  }

  .text {
    text-decoration: ${props => props.isCross && 'line-through'};
    overflow-wrap: break-word;
    word-wrap: break-word;
    font-size: var(--g-text-card-size);
  }

  .card-button {
    display: none;
    position: absolute;
    right: 8px;
    top: 8px;
  }

  .card-textarea-container {
    width: auto;
  }

  .card-textarea {
    font-size: var(--g-text-card-size);
    width: 100%;
    color: blue;
    margin-bottom: -4px;
    padding: 7px;
    border: 1px blue solid;
    border-radius: 3px;
  }
`;

const mapStateToProps = (state: AppState) => ({
  cardState: state.card
});

export default connect(
  mapStateToProps,
  { crossCard, editCard, deleteCard, initCard, currentlyAdding }
)(CardLi);
