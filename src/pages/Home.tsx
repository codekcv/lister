import React from 'react';
import styled from 'styled-components';
import Lists from '../components/list/Lists';

export const Home: React.FC = () => {
  const handleReset = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    localStorage.clear();
  };

  return (
    <>
      <Navbar>
        <ul>
          <li>Home</li>
          <li>Boards</li>
          <li>Save</li>
          <li onClick={handleReset}>Options</li>
        </ul>
      </Navbar>
      <Container>
        <Lists />
      </Container>
    </>
  );
};

const Container = styled.div`
  margin: var(--g-margin);
`;

const Navbar = styled.div`
  width: 100vw;
  height: 64px;
  background: #ebecf0;

  ul {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 20px;

    li {
      margin-left: 30px;
    }
  }
`;
