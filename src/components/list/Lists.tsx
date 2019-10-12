import React from 'react';
import { connect } from 'react-redux';
import { AppState } from '../../store/store';
import { ListState } from '../../store/list/types';
import { addList } from '../../store/list/actions';
import styled from 'styled-components';
import ListLi from './List';
import { Droppable } from 'react-beautiful-dnd';
import { CardState } from '../../store/card/types';

interface Props {
  boardId: string;
  listState: ListState;
  cardState: CardState;
  addList: typeof addList;
}

const Lists: React.FC<Props> = ({ boardId, listState, addList }) => {
  const boardLists = listState.lists.filter(list => list.boardId === boardId);

  const handleNewList = () => {
    addList(boardId, 'Untitled List');
  };

  return (
    <Container>
      <Droppable droppableId={boardId} direction="horizontal" type="list">
        {provided => (
          <div
            className="lists"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {boardLists.map((list, index) => (
              <div key={`${list.id}${index}`}>
                <ListLi list={list} index={index} />
              </div>
            ))}
            {provided.placeholder}
            <div className="button-div" onClick={handleNewList}>
              <button>+ Add a new list</button>
            </div>
          </div>
        )}
      </Droppable>
    </Container>
  );
};

const Container = styled.div`
  display: flex;

  .lists {
    display: flex;
  }

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
  listState: state.list,
  cardState: state.card
});

export default connect(
  mapStateToProps,
  { addList }
)(Lists);
