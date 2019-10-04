import React from 'react';
import styled from 'styled-components';
import Lists from '../components/list/Lists';

interface Props {}

export const Home: React.FC<Props> = () => {
  return (
    <>
      <Navbar>
        <ul>
          <li>Home</li>
          <li>Boards</li>
          <li>Save</li>
          <li>Options</li>
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
  width: 100vwnopm;
  height: 64px;
  background: #ebecf0;
  /* margin: var(--g-margin); */

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
