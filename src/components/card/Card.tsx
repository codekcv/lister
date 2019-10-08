import React, { useState, useEffect } from 'react';
import {
  crossCard,
  editCard,
  deleteCard,
  initCard
} from '../../store/card/actions';
import { Card } from '../../store/card/types';
import styled from 'styled-components';
import { FaPencilAlt, FaTrashAlt } from 'react-icons/fa';
import Textarea from 'react-textarea-autosize';
import { currentlyAdding } from '../../store/list/actions';

interface Props {
  card: Card;
  editCard: typeof editCard;
  deleteCard: typeof deleteCard;
  crossCard: typeof crossCard;
  initCard: typeof initCard;
  currentlyAdding: typeof currentlyAdding;
}

export const CardLi: React.FC<Props> = ({
  card,
  editCard,
  deleteCard,
  crossCard,
  initCard,
  currentlyAdding
}) => {
  const { listId, cardId, text, cross, init } = card;

  //=== Container === \\
  const [hover, setHover] = useState(false);
  const [editing, setEditing] = useState(false);

  const handleMouseEnter = () => setHover(true);
  const handleMouseLeave = () => setHover(false);

  //=== Button ===\\
  const handleDone = () => crossCard(cardId);
  const handleDeleteCard = () => deleteCard(cardId);

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

  useEffect(() => {
    if (!init) {
      initCard(cardId, true);
      setInput('');
      setEditing(true);
    }
  }, []);

  return (
    <Container
      isHover={hover}
      isCross={cross}
      isEdit={editing}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {!editing ? (
        <div className="textDiv" onClick={handleDone}>
          <p className="text">{text}</p>
          <i>
            {hover && (
              <span className="card-button">
                <FaPencilAlt onClick={handleEditText} />{' '}
                <FaTrashAlt onClick={handleDeleteCard} />
              </span>
            )}
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
  );
};

// eslint-disable-next-line
const Container = styled.div<{
  isHover: boolean;
  isEdit: boolean;
  isCross: boolean;
}>`
  position: relative;
  width: auto;

  // border: 1px lightgray solid;
  border-radius: 3px;
  box-shadow: 0 2px lightgray;
  background: ${props =>
    !props.isHover || props.isEdit ? 'white' : '#ebecf0'};

  cursor: pointer;
  margin: calc(var(--g-margin) * 2) 0;

  .textDiv {
    // position: relative;
    margin: calc(var(--g-margin)); //calc(var(--g-margin) * 2);
    padding: var(--g-padding);
    width: auto;
  }

  .text {
    text-decoration: ${props => props.isCross && 'line-through'};
    overflow-wrap: break-word;
    word-wrap: break-word;
  }

  .card-button {
    position: absolute;
    right: 4px;
    //right: 80px;
    top: 4px;
  }

  .card-textarea-container {
    width: auto;
  }

  .card-textarea {
    width: 100%;
    color: blue;
    margin-bottom: -4px;
    padding: 3px 7px;
    border: 1px blue solid;
    border-radius: 3px;
  }
`;
