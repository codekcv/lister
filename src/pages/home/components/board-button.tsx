import React from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';
import { connect } from 'react-redux';
import { BoardState, Board } from '../../../store/board/types';
import { setCurrentBoard } from '../../../store/board/actions';
import { AppState } from '../../../store/store';

interface Props {
  board: Board;
  index: number;
  boardState: BoardState;
  setCurrentBoard: typeof setCurrentBoard;
}

const BoardButon: React.FC<Props> = ({
  board,
  index,
  boardState,
  setCurrentBoard
}) => {
  const { title, id } = board;

  const handleClick = () => {
    setCurrentBoard(board);
  };

  return (
    <Draggable draggableId={id} index={index} type="navbar-button">
      {provided => (
        <Container
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          onClick={handleClick}
          isActive={board.id === boardState.currentBoard.id}
        >
          <div className="centeroo">{title}</div>
        </Container>
      )}
    </Draggable>
  );
};

const Container = styled.div<{ isActive: boolean }>`
  background: ${props => (props.isActive ? 'darkgray' : '#ebecf0')};

  width: 100px;
  height: 40px;
  margin: 0 5px;

  border: 1px solid darkgray;
  border-radius: 3px;
  box-shadow: 0 1px gray;

  .centeroo {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;

    a {
      text-decoration: none;
    }

    p {
      padding: 4px;
      width: 100px;
      text-align: center;

      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }

  :hover {
    cursor: pointer;
    box-shadow: none;
    offset-position: 12px;
    background: lightgray;
  }
`;

const mapStateToProps = (state: AppState) => ({
  boardState: state.board
});

export default connect(
  mapStateToProps,
  { setCurrentBoard }
)(BoardButon);
