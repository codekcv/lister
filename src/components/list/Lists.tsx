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
      <div className="button-div" onClick={handleNewList}>
        <button>+ Add a new list</button>
      </div>
    </Container>
  );
};

const Container = styled.div`
  display: flex;

  .button-div {
    background: rgba(255, 255, 255, 0.25);
    height: 30px;
    text-align: center;
    margin: var(--g-margin);
    border-radius: 3px;

    button {
      background: none;
      color: white;
      width: 300px;
      margin-top: 6px;
      border: none;
    }

    :hover {
      background: rgba(255, 255, 255, 0.45);
    }
  }

  .button-div textarea {
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
