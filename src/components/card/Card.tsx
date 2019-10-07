import React, { useState } from 'react';
import { crossCard, editCard, deleteCard } from '../../store/card/actions';
import { Card } from '../../store/card/types';
import styled from 'styled-components';
import { FaPencilAlt, FaTrashAlt } from 'react-icons/fa';
import Textarea from 'react-textarea-autosize';

interface Props {
  card: Card;
  editCard: typeof editCard;
  deleteCard: typeof deleteCard;
  crossCard: typeof crossCard;
}

export const CardLi: React.FC<Props> = ({
  card,
  editCard,
  deleteCard,
  crossCard
}) => {
  const { cardId, text, cross } = card;
  const [hover, setHover] = useState(false);
  const [edit, setEdit] = useState(false);
  const [input, setInput] = useState('');

  const handleDone = () => crossCard(cardId);
  const handleMouseEnter = () => setHover(true);
  const handleMouseLeave = () => setHover(false);
  const handleDeleteCard = () => deleteCard(cardId);

  const handleEditText = () => {
    setEdit(true);
    setInput(text);
    handleDone();
  };

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };

  const handleEnter = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const val = input.trim();

    if (e.key === 'Enter') {
      setInput('');
      if (val) {
        editCard(cardId, val);
        setEdit(false);
      }
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    const val = input.trim();
    if (val) {
      editCard(cardId, val);
      setEdit(false);
    }
  };

  const handleFocus = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    const temp_value = e.target.value;
    e.target.value = '';
    e.target.value = temp_value;
  };

  return (
    <Container
      isHover={hover}
      isCross={cross}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      isEdit={edit}
    >
      {!edit ? (
        <div className="textDiv" onClick={handleDone}>
          <p className="text">{text}</p>
          <i>
            {hover && (
              <span className="button">
                <FaPencilAlt onClick={handleEditText} />{' '}
                <FaTrashAlt onClick={handleDeleteCard} />
              </span>
            )}
          </i>
        </div>
      ) : (
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
  width: 280px;
  background: ${props => (!props.isHover ? 'white' : '#ebecf0')};

  cursor: pointer;

  .textDiv {
    padding: var(--g-padding);
    margin: calc(var(--g-margin) * 2) 0;

    border-radius: 3px;
    box-shadow: 0 2px lightgray;
    border: 1px lightgray solid;
  }

  .text {
    text-decoration: ${props => props.isCross && 'line-through'};
    overflow-wrap: break-word;
    word-wrap: break-word;
  }

  .button {
    position: absolute;
    right: 8px;
    top: 8px;
  }

  .card-textarea {
    height: 300px;
  }
`;
