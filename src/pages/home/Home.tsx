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
  setCurrentBoard
} from '../../store/board/actions';

interface Props {
  boardState: BoardState;
  addBoard: typeof addBoard;
  showAllBoard: typeof showAllBoard;
  setCurrentBoard: typeof setCurrentBoard;
}

const Home: React.FC<Props> = ({ boardState, addBoard, showAllBoard }) => {
  const { showAll } = boardState;

  const handleReset = () => {
    localStorage.clear();
    window.location.reload();
  };

  const handleShowAllBoard = () => {
    showAllBoard(!boardState.showAll);
  };

  const boardMap = boardState.boards.map(board => ({ title: board.title }));

  return (
    <Container showAll={showAll}>
      <div className="navbar">
        <div className="boards-button">
          {boardMap.map(board => (
            <BoardButon key={board.title} boardButton={board} />
          ))}
          <div className="add-board" onClick={() => addBoard('Untitled')}>
            + Add Board
          </div>
        </div>

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
              <div className="nav-button sign-in">
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
  { addBoard, showAllBoard }
)(Home);
