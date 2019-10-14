import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
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
    <Draggable draggableId={id} index={index} type="navbar-btton">
      {provided => (
        <Container
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Link to={`#${id}`} onClick={handleClick}>
            <h4>{title}</h4>
          </Link>
        </Container>
      )}
    </Draggable>
  );
};

const Container = styled.div`
  width: 100px;
  height: 40px;
  margin: 0 5px;
  border: 1px solid darkgray;
  border-radius: 3px;
  box-shadow: 0 1px gray;

  h4 {
    text-align: center;
    line-height: 40px;
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
