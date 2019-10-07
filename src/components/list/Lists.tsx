import React from 'react';
import { connect } from 'react-redux';
import { AppState } from '../../store/store';
import { ListState } from '../../store/list/types';
import {
  addList,
  editList,
  deleteList,
  focusList
} from '../../store/list/actions';
import styled from 'styled-components';
import { ListLi } from './List';

interface Props {
  listState: ListState;
  addList: typeof addList;
  editList: typeof editList;
  deleteList: typeof deleteList;
  focusList: typeof focusList;
}

const Lists: React.FC<Props> = ({
  listState,
  addList,
  editList,
  deleteList,
  focusList
}) => {
  const { lists } = listState;

  const handleNewList = () => {
    addList('Untitled List');
  };

  return (
    <Container>
      {/* <div className="modal" /> */}
      <ul className="lists">
        {lists.map(list => (
          <li key={list.id}>
            <ListLi
              list={list}
              editList={editList}
              deleteList={deleteList}
              focusList={focusList}
            />
          </li>
        ))}
      </ul>
      <div className="new-list">
        <p onClick={handleNewList}>New List</p>
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

  .new-list {
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

  textarea {
    width: 280px;
    padding: var(--g-padding);
  }
`;

const mapStateToProps = (state: AppState) => ({
  listState: state.list
});

export default connect(
  mapStateToProps,
  { addList, editList, deleteList, focusList: focusList }
)(Lists);
