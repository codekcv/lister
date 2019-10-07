import React, { useState, useRef, useEffect } from 'react';
import { List } from '../../store/list/types';
import { editList, deleteList, autofocusList } from '../../store/list/actions';
import Cards from '../card/Cards';
import styled from 'styled-components';

interface Props {
  list: List;
  editList: typeof editList;
  deleteList: typeof deleteList;
  autofocusList: typeof autofocusList;
}

export const ListLi: React.FC<Props> = ({
  list,
  editList,
  deleteList,
  autofocusList
}) => {
  const { id, title, autofocus } = list;
  const [editTitle, setEditTitle] = useState('');
  const [isChanging, setIsChanging] = useState(false);
  const [newFocus, setNewFocus] = useState(false);

  const handleChangeTitle = (
    e: React.MouseEvent<HTMLParagraphElement, MouseEvent>
  ) => {
    setEditTitle(title);
    setIsChanging(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditTitle(e.target.value);
  };

  const handleTitleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    setIsChanging(false);
    editList(id, editTitle);
  };

  const handleNewlyAdded = () => {};

  useEffect(() => {
    console.log(1, autofocus);
    if (!autofocus) {
      autofocusList(id, true);
      setEditTitle('');
      setIsChanging(true);
    }

    // eslint-disable-next-line]
  }, []);

  // eslint-disable-next-line
  const handleListDelete = (
    e: React.MouseEvent<HTMLParagraphElement, MouseEvent>
  ) => {
    deleteList(id);
  };

  return (
    <Container>
      {!isChanging ? (
        <h2 onClick={handleChangeTitle}>{title}</h2>
      ) : (
        <form onSubmit={handleTitleOnSubmit}>
          <input
            className="edit-title"
            value={editTitle}
            placeholder="Enter new title..."
            onChange={handleChange}
            autoFocus
          ></input>
          {/* <button type="submit">Done</button> */}
        </form>
      )}

      <Cards listId={id} />
    </Container>
  );
};

const Container = styled.div`
  background: #ebecf0;
  width: 300px;
  margin: var(--g-margin);
  padding: var(--g-padding);
  border: 2px lightgray solid;
  border-radius: 3px;
  box-shadow: 0 4px lightgray;

  h2 {
    text-align: center;
    padding: 0.35rem 0;
    width: 280px;
    height: 45px;
  }

  input {
    font-size: 1.5em;
    width: 280px;
    height: 45px;
    padding: var(--g-padding);
    margin: var(--g-margin) 0;
  }
`;
