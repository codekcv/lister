import React from 'react';
import styled from 'styled-components';
import List2 from '../components/list/List2';

interface Props {}

export const Home: React.FC<Props> = () => {
  return (
    <Container>
      <List2 />
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
