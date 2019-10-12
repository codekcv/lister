import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Board, BoardState } from '../../store/board/types';
import { AppState } from '../../store/store';
import Lists from '../list/Lists';
import { Draggable } from 'react-beautiful-dnd';
import { FaPencilAlt, FaTrashAlt } from 'react-icons/fa';
import { deleteBoard } from '../../store/board/actions';
import styled from 'styled-components';

interface Props {
  board: Board;
  boardState: BoardState;
  index: number;

  deleteBoard: typeof deleteBoard;
}

const BoardLi: React.FC<Props> = ({
  board,
  boardState,
  index,
  deleteBoard
}) => {
  const { id, title } = board;
  const [input, setInput] = useState('');
  const [editing, setEditing] = useState(false);

  const handleBoardEdit = () => {
    setInput(title);
    setEditing(true);
  };

  const handleBoardDelete = () => {
    deleteBoard(id);
  };

  return (
    <Container dragging={boardState.dragging}>
      <Draggable draggableId={id} index={index} type="board">
        {provided => (
          <div ref={provided.innerRef} {...provided.draggableProps}>
            <div
              className="board-title-background"
              {...provided.dragHandleProps}
            >
              <div className="board-title-area">
                <h2>{title} </h2>
                {'  '}
                <span className="board-button">
                  <FaPencilAlt onClick={handleBoardEdit} size="1.5rem" />{' '}
                  <FaTrashAlt onClick={handleBoardDelete} size="1.5rem" />
                </span>
              </div>
            </div>
            {provided.placeholder}
            <div className="hide">
              <Lists boardId={id} />
            </div>
          </div>
        )}
      </Draggable>
    </Container>
  );
};

const Container = styled.div<{ dragging: boolean }>`
  .board-title-background {
    background: #ebecf0;
    margin: 4px;
    padding: 4px 12px;
    border-radius: 3px;
    box-shadow: 0 2px lightgray;
    border: 1px pink solid;
  }

  .board-title-area {
    position: relative;
    display: inline-block;

    h2 {
      display: inline-block;
    }

    .board-button {
      position: absolute;
      display: none;
      /* margin-top: 60px; */
      top: 2px;
      right: -56px;
    }

    :hover {
      .board-button {
        display: inline;
      }
    }
  }
`;

const mapStateToProps = (state: AppState) => ({
  boardState: state.board
});

export default connect(
  mapStateToProps,
  { deleteBoard }
)(BoardLi);
