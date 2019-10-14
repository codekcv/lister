import React from 'react';
import styled from 'styled-components';

export interface BoardButtonInt {
  title: string;
}

interface Props {
  boardButton: BoardButtonInt;
}

const BoardButon: React.FC<Props> = ({ boardButton }) => {
  const { title } = boardButton;

  return (
    <Container>
      <h4>{title}</h4>
    </Container>
  );
};

const Container = styled.div`
  width: 100px;
  height: 40px;
  margin: 0 5px;
  border: 1px solid darkgray;
  border-radius: 3px;
  box-shadow: 0 1px gray;

  h4 {
    text-align: center;
    line-height: 40px;
  }

  :hover {
    cursor: pointer;
    box-shadow: none;
    offset-position: 12px;
    background: lightgray;
  }
`;

export default BoardButon;
