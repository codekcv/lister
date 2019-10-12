import React from 'react';
import { connect } from 'react-redux';
import { Board, BoardState } from '../../store/board/types';
import { AppState } from '../../store/store';
import Lists from '../list/Lists';
import { Draggable } from 'react-beautiful-dnd';

interface Props {
  board: Board;
  boardState: BoardState;
  index: number;
}

const BoardLi: React.FC<Props> = ({ board, boardState, index }) => {
  const { id, title } = board;

  return (
    <>
      <Draggable draggableId={id} index={index} type="board">
        {provided => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <h1 {...provided.dragHandleProps}>{title}</h1>
            <Lists boardId={id} />
            {provided.placeholder}
          </div>
        )}
      </Draggable>
    </>
  );
};

const mapStateToProps = (state: AppState) => ({
  boardState: state.board
});

export default connect(
  mapStateToProps,
  {}
)(BoardLi);
