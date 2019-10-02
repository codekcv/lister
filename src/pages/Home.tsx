import React from 'react';
import List from '../components/list/List';
import styled from 'styled-components';

interface Props {}

export const Home: React.FC<Props> = () => {
  return (
    <Container>
      <List />
    </Container>
  );
};

const Container = styled.div`
  margin: 8px;
`;
