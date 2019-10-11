import React from 'react';
import { connect } from 'react-redux';
import { Board, BoardState } from '../../store/board/types';
import { AppState } from '../../store/store';
import Lists from '../list/Lists';

interface Props {
  board: Board;
  boardState: BoardState;
  index: number;
}

const BoardLi: React.FC<Props> = ({ board, boardState, index }) => {
  const { id, title } = board;

  return (
    <>
      <h1>{title}</h1>
      <Lists boardId={id} />
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
