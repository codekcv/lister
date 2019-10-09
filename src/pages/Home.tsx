import React from 'react';
import styled from 'styled-components';
import Lists from '../components/list/Lists';
import { Link } from 'react-router-dom';

export const Home: React.FC = () => {
  const handleReset = () => {
    localStorage.clear();
    window.alert('State has been reset.');
    window.location.reload();
  };

  const handleClick = () => {
    window.alert('Under construction');
  };

  return (
    <Container>
      <div className="navbar-container">
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
        </nav>
      </div>

      <div className="lists-container">
        <Lists />
      </div>
    </Container>
  );
};

const Container = styled.div`
  .navbar-container {
    width: 100vw;
    height: 64px;

    nav {
      position: fixed;
      background: #ebecf0;
      width: 100vw;
      height: 64px;

      ul {
        display: flex;
        justify-content: center;
        margin-right: 20px;
        padding-top: 20px;
      }
    }
  }

  a {
    text-decoration: none;
    margin-left: 30px;
    padding: 4px 12px;
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

  .lists-container {
    margin: var(--g-margin);
  }
`;
