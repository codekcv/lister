import React, { useState } from 'react';
import { connect } from 'react-redux';
import { ListState } from '../../store/list/types';
import { AppState } from '../../store/store';
import {
  addCard,
  editCard,
  deleteCard,
  editTitle
} from '../../store/list/actions';
import { Card } from '../card/Card';
import styled from 'styled-components';
import { FaPlusSquare } from 'react-icons/fa';

interface Props {
  listState: ListState;
  editTitle: typeof editTitle;
  addCard: typeof addCard;
  editCard: typeof editCard;
  deleteCard: typeof deleteCard;
}

const List: React.FC<Props> = ({
  listState,
  editTitle,
  addCard,
  editCard,
  deleteCard
}) => {
  const [input, setInput] = useState('');
  const [isChangingTitle, setIsChangingTitle] = useState(false);
  const [currentTitle, setCurrentTitle] = useState(listState.title);
  const { title, cards } = listState;

  const handleChangeTitle = (
    e: React.MouseEvent<HTMLHeadingElement, MouseEvent>
  ) => {
    setIsChangingTitle(true);
  };

  const handleChangeTitleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentTitle(e.target.value);
  };

  const handleTitleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (currentTitle) {
      editTitle(currentTitle);
      setIsChangingTitle(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input) {
      addCard(require('short-uuid').generate(), input);
      setInput('');
    }
  };

  return (
    <Container>
      {/*/=== TITLE ===/*/}
      {!isChangingTitle ? (
        <p className="title" onClick={handleChangeTitle}>
          {title}
        </p>
      ) : (
        <form onSubmit={handleTitleSubmit}>
          <input
            type="text"
            placeholder="Change title..."
            value={currentTitle}
            onChange={handleChangeTitleInput}
          />
          <button type="submit">Done</button>
        </form>
      )}

      {/*/=== SHOW CARDS ===/*/}
      <ul>
        {cards.map(card => (
          <li key={card.id}>
            <Card
              id={card.id}
              text={card.text}
              editCard={editCard}
              deleteCard={deleteCard}
            />
          </li>
        ))}
      </ul>

      {/*/=== ADD CARD ===/*/}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Add card..."
          value={input}
          onChange={handleChange}
        />
        <button type="submit">
          <FaPlusSquare size={16} />
        </button>
      </form>
    </Container>
  );
};

const Container = styled.div`
  background: #ebecf0;
  border-radius: 3px;
  width: 275px;
  box-shadow: 0px 1px lightgray;

  ul {
    margin: 4px;

    li {
      background: white;
      margin: 8px 4px;
      border-radius: 3px;
      font-size: 14px;
      box-shadow: 0px 1px lightgray;
      list-style: none;
    }
  }

  .title {
    text-align: center;
    font-size: 1.5rem;
    padding: 0.5rem 0 0 0;
  }

  form {
    padding-bottom: 8px;
  }

  input {
    margin-left: 8px;
    width: 232px;
    border: none;
    border-radius: 3px;
  }

  button {
    margin-left: 8px;
    width: 16px;
    border: none;
    border-radius: 3px;
    justify-content: center;
    /* padding-top: 6px; */
  }
`;

const mapStateToProps = (state: AppState) => ({
  listState: state.list
});

export default connect(
  mapStateToProps,
  { editTitle, addCard, editCard, deleteCard }
)(List);
