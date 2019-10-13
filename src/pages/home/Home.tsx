import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Boards from '../../components/board/Boards';
import BoardButon, { BoardButtonInt } from './components/board-button';
import { connect } from 'react-redux';
import { AppState } from '../../store/store';
import { BoardState, Board } from '../../store/board/types';
import { FaCogs, FaCog } from 'react-icons/fa';

interface Props {
  boardState: BoardState;
}

const Home: React.FC<Props> = ({ boardState }) => {
  const handleReset = () => {
    localStorage.clear();
    window.location.reload();
  };

  const handleClick = () => {
    window.alert('Under construction');
  };

  // const boards: BoardButtonInt[] = [
  //   {
  //     title: 'nice'
  //   },
  //   {
  //     title: 'nice'
  //   },
  //   {
  //     title: 'nice'
  //   }
  // ];

  const [boards, setBoards] = useState<BoardButtonInt[]>([{ title: '' }]);

  const boardMap = boardState.boards.map(board => ({ title: board.title }));

  // setBoards(boardMap);

  useEffect(() => {}, []);

  return (
    <Container>
      <div className="navbar">
        <div className="boards-button">
          {boardMap.map(board => (
            <BoardButon boardButton={board} />
          ))}
        </div>

        <nav className="menus">
          <ul>
            <li>
              <div className="nav-button show-all-boards">
                <Link to="#" onClick={handleReset}>
                  Show All Boards
                </Link>
              </div>
            </li>
            <li>
              <div className="nav-button sign-in">
                <Link to="#" onClick={handleReset}>
                  Sign In
                </Link>
              </div>
            </li>
            <li>
              <div className="nav-button options">
                <div className="centeroo">
                  <Link to="#" onClick={handleReset}>
                    <FaCog />
                  </Link>
                </div>
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

const Container = styled.div`
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
            position: relative;
            text-align: center;
            line-height: 40px;
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
            width: 180px;
          }

          .sign-in {
            width: 90px;
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
    margin: var(--g-margin);
  }
`;

const mapStateToProps = (state: AppState) => ({
  boardState: state.board
});

export default connect(
  mapStateToProps,
  {}
)(Home);

/* <BoardButon boardButton={but} />
        <nav>
          <ul>
            <li onClick={handleClick}>
              <Link to="#">Home</Link>
            </li>
            <li onClick={handleClick}>
              <Link to="#">Boards</Link>
            </li>
            <li onClick={handleReset}>
              <Link to="#">Clear State</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
          </ul>
        </nav> */
