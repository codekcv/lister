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

  return (
    <Container>
      <ul className="lists">
        {lists.map(list => (
          <Li key={list.id}>
            <ListLi list={list} editList={editList} deleteList={deleteList} />
          </Li>
        ))}
      </ul>
    </Container>
  );
};

const Container = styled.div`
  .lists {
    display: flex;
  }
`;

const Li = styled.li`
  list-style: none;
  width: 300px;

  h2 {
    color: red;
    text-indent: 40px;
  }
`;

const mapStateToProps = (state: AppState) => ({
  listState: state.list
});

export default connect(
  mapStateToProps,
  { addList, editList, deleteList }
)(Lists);
