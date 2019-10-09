import React from 'react';
import styled from 'styled-components';
import Lists from '../components/list/Lists';

export const Home: React.FC = () => {
  const handleReset = () => {
    localStorage.clear();
  };

  return (
    <Container>
      <div className="navbar-container">
        <nav>
          <ul>
            {/* <li>Home</li>
            <li>Boards</li>
            <li>Save</li> */}
            <li onClick={handleReset}>Clear</li>
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
        justify-content: flex-end;
        margin-right: 20px;
        padding-top: 14px;

        li {
          background: lightgray;
          margin-left: 30px;
          padding: 4px;
          border: 2px solid darkgray;
          border-radius: 3px;

          :hover {
            cursor: pointer;
          }
        }
      }
    }
  }

  .lists-container {
    margin: var(--g-margin);
  }
`;
