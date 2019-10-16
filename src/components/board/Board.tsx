import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Board, BoardState } from '../../store/board/types';
import { AppState } from '../../store/store';
import Lists from '../list/Lists';
import { Draggable } from 'react-beautiful-dnd';
import { FaPencilAlt, FaTrashAlt } from 'react-icons/fa';
import {
  deleteBoard,
  editBoard,
  setFocusBoard,
  setCurrentBoard
} from '../../store/board/actions';
import styled from 'styled-components';

interface Props {
  board: Board;
  boardState: BoardState;
  index: number;

  deleteBoard: typeof deleteBoard;
  editBoard: typeof editBoard;
  setFocusBoard: typeof setFocusBoard;
  setCurrentBoard: typeof setCurrentBoard;
}

const BoardLi: React.FC<Props> = ({
  board,
  boardState,
  index,
  deleteBoard,
  editBoard,
  setFocusBoard,
  setCurrentBoard
}) => {
  const { id, title, autofocus } = boardState.boards.filter(
    item => item.id === board.id
  )[0];
  // const { id, title, autofocus } = boardState.boards.find(
  //   (item = item.id === board.id)
  // );
  const [input, setInput] = useState('');
  const [editing, setEditing] = useState(false);

  const handleBoardEdit = () => {
    if (title === 'Untitled') {
      setInput('');
    } else {
      setInput(title);
    }

    setEditing(true);
  };

  const handleBoardDelete = () => {
    deleteBoard(id);
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleOnBlur = () => {
    handleSubmit();
  };

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    handleSubmit();
  };

  const handleSubmit = () => {
    setEditing(false);

    if (input.trim()) {
      editBoard(id, input);
    } else {
      editBoard(id, 'Untitled');
    }
  };

  if (!autofocus) {
    setFocusBoard(id, true);
    handleBoardEdit();
    setInput('');
  }

  const handleSetCurrentBoard = () => {
    setCurrentBoard(board);
  };

  return (
    <Container dragging={boardState.dragging} onClick={handleSetCurrentBoard}>
      <Draggable
        draggableId={id}
        index={index}
        type="board"
        isDragDisabled={!boardState.showAll}
      >
        {provided => (
          <div ref={provided.innerRef} {...provided.draggableProps}>
            <div
              className="board-title-background"
              {...provided.dragHandleProps}
            >
              {!editing ? (
                <div className={`board-title-area ${board.id}`}>
                  <h2>{title}</h2>
                  <span className="board-button">
                    <FaPencilAlt onClick={handleBoardEdit} size="1.5rem" />{' '}
                    <FaTrashAlt onClick={handleBoardDelete} size="1.5rem" />
                  </span>
                </div>
              ) : (
                <form onSubmit={handleOnSubmit}>
                  <input
                    className="board-title-input"
                    type="text"
                    value={input}
                    onChange={handleOnChange}
                    onBlur={handleOnBlur}
                    autoFocus
                    placeholder="Untitled"
                  />
                </form>
              )}
            </div>
            {provided.placeholder}
            <div className="hide" {...provided.dragHandleProps}>
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

    :hover {
      .board-button {
        display: inline;
      }
    }
  }

  .board-title-input {
    font-size: 1.5em;
    font-weight: bold;
    border: none;
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
      top: 2px;
      right: -56px;
    }
  }
`;

const mapStateToProps = (state: AppState) => ({
  boardState: state.board
});

export default connect(
  mapStateToProps,
  { editBoard, deleteBoard, setFocusBoard, setCurrentBoard }
)(BoardLi);
