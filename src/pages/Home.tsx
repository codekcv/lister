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
            <li>Home</li>
            <li>Boards</li>
            <li>Save</li>
            <li onClick={handleReset}>Options</li>
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
        align-items: center;
        padding-top: 20px;

        li {
          margin-left: 30px;
        }
      }
    }
  }

  .lists-container {
    margin: var(--g-margin);
  }
`;
