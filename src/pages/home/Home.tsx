import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Boards from '../../components/board/Boards';
import { connect } from 'react-redux';
import { AppState } from '../../store/store';
import { BoardState } from '../../store/board/types';
import { FaCog } from 'react-icons/fa';
import BoardButon from './components/board-button';
import {
  addBoard,
  showAllBoard,
  setCurrentBoard,
  reorderBoard
} from '../../store/board/actions';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

interface Props {
  boardState: BoardState;
  addBoard: typeof addBoard;
  showAllBoard: typeof showAllBoard;
  setCurrentBoard: typeof setCurrentBoard;
  reorderBoard: typeof reorderBoard;
}

const Home: React.FC<Props> = ({
  boardState,
  addBoard,
  showAllBoard,
  reorderBoard,
  setCurrentBoard
}) => {
  const { boards, showAll } = boardState;

  const handleReset = () => {
    localStorage.clear();
    window.location.reload();
  };

  const handleShowAllBoard = () => {
    showAllBoard(!boardState.showAll);
  };

  const onDragEnd = (result: any) => {
    const { destination, source, draggableId } = result;

    if (
      !destination ||
      (destination.droppableId === source.droppableId &&
        destination.index === source.index)
    ) {
      return;
    }

    const draggedBoard = boards.find(board => board.id === draggableId);

    if (draggedBoard) {
      const newOrder = boards.map(board => board);

      newOrder.splice(source.index, 1);
      newOrder.splice(destination.index, 0, draggedBoard);

      reorderBoard(newOrder);
    }
  };

  const handleNewBoard = () => {
    console.log('action', addBoard('New Board'));
    console.log('home', boards[boards.length]);

    // setCurrentBoard(boards[boards.length - 1]);
  };

  return (
    <Container showAll={showAll}>
      <div className="navbar">
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable
            droppableId={'navbar-boards'}
            direction="horizontal"
            type="navbar-btton"
          >
            {provided => (
              <div
                className="boards-button"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {boards.map((board, index) => (
                  <BoardButon key={board.id} board={board} index={index} />
                ))}
                {provided.placeholder}
                <div className="add-board" onClick={handleNewBoard}>
                  + Add Board
                </div>
              </div>
            )}
          </Droppable>
        </DragDropContext>

        <nav className="menus">
          <ul>
            <li>
              <div
                className="nav-button show-all-boards"
                onClick={handleShowAllBoard}
              >
                <Link to="#">Show All Boards</Link>
              </div>
            </li>
            <li>
              <div
                className="nav-button sign-in"
                onClick={() => window.alert('Under construction.')}
              >
                <Link to="#">Sign In</Link>
              </div>
            </li>
            <li>
              <div className="nav-button options" onClick={handleReset}>
                <Link to="#">
                  <FaCog />
                </Link>
              </div>
            </li>
          </ul>
        </nav>
      </div>

      <div className="board-container">
        <Boards />
      </div>
    </Container>
  );
};

const Container = styled.div<{ showAll: boolean }>`
  .navbar {
    display: flex;
    justify-content: space-between;
    background: #ebecf0;
    width: 100vw;
    height: 60px;
    padding-top: 10px;

    .boards-button {
      display: flex;
      margin: 0 5px;

      .add-board {
        width: 100px;
        height: 40px;
        margin: 0 5px;
        border: 1px solid darkgray;
        border-radius: 3px;
        box-shadow: 0 1px gray;
        text-align: center;
        line-height: 40px;
      }
    }

    nav {
      margin-right: 5px;

      ul {
        display: flex;
        justify-content: center;
        li {
          position: relative;

          a {
            text-decoration: none;
          }

          .nav-button {
            display: flex;
            justify-content: center;
            align-items: center;

            width: 100px;
            height: 40px;
            margin: 0 5px;
            border: 1px solid darkgray;
            border-radius: 3px;
            box-shadow: 0 1px gray;

            :hover {
              cursor: pointer;
              box-shadow: none;
              offset-position: 12px;
              background: lightgray;
            }
          }

          .show-all-boards {
            width: 140px;

            ${props =>
              props.showAll &&
              `cursor: pointer;
              box-shadow: none; 
              background: darkgray;`}
          }

          .sign-in {
            width: 75px;
            color: yellow;
          }

          .options {
            width: 45px;
            padding-top: 2px;
          }
        }
      }
    }
  }

  .board-container {
    margin: 8px var(--g-margin);
  }
`;

const mapStateToProps = (state: AppState) => ({
  boardState: state.board
});

export default connect(
  mapStateToProps,
  { addBoard, showAllBoard, reorderBoard, setCurrentBoard }
)(Home);
