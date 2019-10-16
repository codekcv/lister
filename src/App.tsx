import React from 'react';
import './App.css';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { BoardState } from './store/board/types';
import { addBoard, showAllBoard, reorderBoard } from './store/board/actions';
import { AppState } from './store/store';
import Boards from './components/board/Boards';
import BoardButton from './components/navbar/board-button';
import Options from './components/navbar/options';

interface Props {
  boardState: BoardState;
  addBoard: typeof addBoard;
  showAllBoard: typeof showAllBoard;
  reorderBoard: typeof reorderBoard;
}

const Home: React.FC<Props> = ({
  boardState,
  addBoard,
  showAllBoard,
  reorderBoard
}) => {
  const { boards, showAll, backgroundColor } = boardState;

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
    addBoard('Untitled');
  };

  return (
    <Container showAll={showAll} backgroundColor={backgroundColor}>
      <div className="navbar">
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable
            droppableId={'navbar-boards'}
            direction="horizontal"
            type="navbar-button"
          >
            {provided => (
              <div
                className="boards-button"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {boards.map((board, index) => (
                  <BoardButton key={board.id} board={board} index={index} />
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
          <ul className="home-ul">
            <li className="home-li">
              <div
                className="nav-button show-all-boards"
                onClick={handleShowAllBoard}
              >
                Show All Boards
              </div>
            </li>
            <li className="home-li">
              <div
                className="nav-button sign-in"
                onClick={() => window.alert('Under construction.')}
              >
                Sign In
              </div>
            </li>
            <li className="home-li">
              <Options />
            </li>
          </ul>
        </nav>
      </div>

      <div className="background-color" />

      <div className="board-container">
        <Boards />
      </div>
    </Container>
  );
};

const Container = styled.div<{ showAll: boolean; backgroundColor: string }>`
  height: 100vh;

  .navbar {
    position: fixed;
    background: #ebecf0;
    display: flex;
    justify-content: space-between;
    z-index: 1;
    width: 100%;
    height: 60px;
    top: 0;
    left: 0;
    padding-top: 10px;
    box-shadow: 0 0 3px gray;

    .boards-button {
      display: flex;
      margin: 0 5px;

      .add-board {
        width: 100px;
        height: 40px;
        margin: 0 5px;
        border-radius: 3px;
        text-align: center;
        color: gray;
        cursor: pointer;
        line-height: 40px;

        :hover {
          background: lightgray;
          text-decoration: underline;
        }
      }
    }

    nav {
      margin-right: 5px;

      .home-ul {
        display: flex;
        justify-content: center;
        .home-li {
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
          }

          .options {
            width: 45px;
          }

          .reset-button {
            width: 100%;
            margin: 8px 0 0 0;
          }
        }
      }
    }
  }

  .board-container {
    margin-top: 60px;
    padding: 8px;
  }

  .background-color {
    background-color: ${props => props.backgroundColor};
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
  }
`;

const mapStateToProps = (state: AppState) => ({
  boardState: state.board
});

export default connect(
  mapStateToProps,
  {
    addBoard,
    showAllBoard,
    reorderBoard
  }
)(Home);
