import React from 'react';
import styled from 'styled-components';
import Lists from '../components/list/Lists';

interface Props {}

export const Home: React.FC<Props> = () => {
  return (
    <Container>
      <Lists />
    </Container>
  );
};

const Container = styled.div`
  margin: 8px;

  /* ul {
    display: flex;
  }

  li {
    margin: 0 4px;
    list-style: none;
  } */
`;
