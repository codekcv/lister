import React from 'react';
import { connect } from 'react-redux';
import { AppState } from '../../store/store';
import { ListState } from '../../store/list/types';
import { addList, editList, deleteList } from '../../store/list/actions';
import Card2 from '../card/Card2';
import styled from 'styled-components';

interface Props {
  listState: ListState;
  addList: typeof addList;
  editList: typeof editList;
  deleteList: typeof deleteList;
}

const List2: React.FC<Props> = ({ listState }) => {
  const { lists } = listState;

  return (
    <Container>
      <ul className="lists">
        {lists.map(list => (
          <li key={list.id}>
            <p>{list.title}</p>
            <div>
              <Card2 listId={list.id} />
            </div>
          </li>
        ))}
      </ul>
    </Container>
  );
};

const Container = styled.div`
  .lists {
    display: flex;
  }

  li {
    list-style: none;
  }
`;

const mapStateToProps = (state: AppState) => ({
  listState: state.list
});

export default connect(
  mapStateToProps,
  { addList, editList, deleteList }
)(List2);
