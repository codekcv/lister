import React from 'react';
import { connect } from 'react-redux';
import { AppState } from '../../store/store';
import { ListState } from '../../store/list/types';
import { addList, editList, deleteList } from '../../store/list/actions';
import styled from 'styled-components';
import { ListLi } from './List';

interface Props {
  listState: ListState;
  addList: typeof addList;
  editList: typeof editList;
  deleteList: typeof deleteList;
}

const Lists: React.FC<Props> = ({
  listState,
  addList,
  editList,
  deleteList
}) => {
  const { lists } = listState;

  const handleNewList = () => {
    addList('New List');
  };

  return (
    <Container>
      <ul className="lists">
        {lists.map(list => (
          <li key={list.id}>
            <ListLi list={list} editList={editList} deleteList={deleteList} />
          </li>
        ))}
      </ul>
      <div className="newList">
        <h1 onClick={handleNewList}>New List</h1>
      </div>
    </Container>
  );
};

const Container = styled.div`
  display: flex;

  .lists {
    display: flex;

    li {
      list-style: none;
    }
  }

  .newList {
    width: 300px;
    background: #ebecf0;
    height: 60px;
    margin: var(--g-margin);
    padding: var(--g-padding);
    border: 2px lightgray solid;
    border-radius: 3px;
    box-shadow: 0 4px lightgray;
    text-align: center;
  }
`;

const mapStateToProps = (state: AppState) => ({
  listState: state.list
});

export default connect(
  mapStateToProps,
  { addList, editList, deleteList }
)(Lists);
