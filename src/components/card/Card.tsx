import React, { useState } from 'react';
import { crossCard, editCard, deleteCard } from '../../store/card/actions';
import { Card } from '../../store/card/types';
import styled from 'styled-components';
import { FaPencilAlt, FaTrashAlt } from 'react-icons/fa';

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

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    editCard(cardId, input);
    setEdit(false);
  };

  return (
    <Container
      isHover={hover}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {!edit ? (
        <Div isCross={cross} onClick={handleDone}>
          <span className="text">{text}</span>
          <i>
            {hover && (
              <span className="butones">
                <FaPencilAlt onClick={handleEditText} />{' '}
                <FaTrashAlt onClick={handleDeleteCard} />
              </span>
            )}
          </i>
        </Div>
      ) : (
        <form onSubmit={handleSubmit}>
          {/* <textarea
            type="text"
            placeholder="Add card..."
            value={input}
            onChange={handleInput}
          /> */}
          <textarea rows={5} cols={50} name="description">
            Enter your name
          </textarea>
          {/* <button type="submit">Done</button> */}
        </form>
      )}
    </Container>
  );
};

const Container = styled.div<{ isHover: boolean }>`
  position: relative;
  width: 280px;
  background: ${props => (!props.isHover ? 'white' : '#ebecf0')};
  margin: calc(var(--g-margin) * 2) 0;
  border: 1px lightgray solid;
  border-radius: 3px;
  box-shadow: 0 2px lightgray;
  cursor: pointer;

  input {
    height: 34px;
    border: 1px royalblue solid;
    border-radius: 3px;
    padding: var(--g-padding);
    background: #ebecf0;
  }

  .butones {
    position: absolute;
    right: 8px;
  }
`;

const Div = styled.p<{ isCross: boolean }>`
  display: flex;
  justify-content: space-between;
  padding: 8px;
  /* height: 34px; */

  .text {
    text-decoration: ${props => props.isCross && 'line-through'};
  }
`;
