import React from 'react';
import { connect } from 'react-redux';
import { AppState } from '../../store/store';
import { BoardState } from '../../store/board/types';
import Board from './Board';

interface Props {
  boardState: BoardState;
}

const Boards: React.FC<Props> = ({ boardState }) => {
  const { boards } = boardState;
  console.log(boards);

  return (
    <>
      {boards.map((board, index) => (
        <Board board={board} index={index} />
      ))}
    </>
  );
};

const mapStateToProps = (state: AppState) => ({
  boardState: state.board
});

export default connect(
  mapStateToProps,
  {}
)(Boards);
