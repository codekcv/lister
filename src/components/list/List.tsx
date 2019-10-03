import React, { useState } from 'react';
import { List } from '../../store/list/types';
import { editList, deleteList } from '../../store/list/actions';
import Cards from '../card/Cards';
import styled from 'styled-components';

interface Props {
  list: List;
  editList: typeof editList;
  deleteList: typeof deleteList;
}

export const ListLi: React.FC<Props> = ({ list, editList, deleteList }) => {
  const { id, title } = list;
  const [editTitle, setEditTitle] = useState('');
  const [isChanging, setIsChanging] = useState(false);

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
            value={editTitle}
            placeholder="Enter new title..."
            onChange={handleChange}
          ></input>
          <button type="submit">Done</button>
        </form>
      )}

      <Cards listId={id} />
    </Container>
  );
};

const Container = styled.div`
  list-style: none;
  border: 3px pink solid;
  background: #ebecf0;
  border-radius: 3px;
  margin: 12px;
`;
