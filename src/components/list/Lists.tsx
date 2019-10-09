import React from 'react';
import { connect } from 'react-redux';
import { AppState } from '../../store/store';
import { ListState } from '../../store/list/types';
import { addList } from '../../store/list/actions';
import styled from 'styled-components';
import ListLi from './List';

interface Props {
  listState: ListState;
  addList: typeof addList;
}

const Lists: React.FC<Props> = ({ listState, addList }) => {
  const { lists } = listState;

  const handleNewList = () => {
    addList('Untitled List');
  };

  return (
    <Container>
      {lists.map(list => (
        <div key={list.id}>
          <ListLi list={list} />
        </div>
      ))}
      <button className="new-list" onClick={handleNewList}>
        + Add a list
      </button>
    </Container>
  );
};

const Container = styled.div`
  display: flex;

  .new-list {
    background: rgba(255, 255, 255, 0.25);
    color: white;
    text-align: center;
    width: 300px;
    height: 30px;
    margin: var(--g-margin);
    border: none;
    border-radius: 3px;
  }

  .new-list:hover {
    background: rgba(255, 255, 255, 0.45);
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
  { addList }
)(Lists);
