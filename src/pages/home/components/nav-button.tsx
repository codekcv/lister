import React from 'react';
import styled from 'styled-components';
import { IconType } from 'react-icons/lib/cjs';
import { FaCog, FaCogs } from 'react-icons/fa';

interface Props {
  title?: string;
  icon?: IconType;
  width: number;
}

const NavButton: React.FC<Props> = ({ title, icon, width }) => {
  return (
    <Container width={width}>
      {title ? <h4>{title}</h4> : <FaCog />}
      <h4>{title}</h4>
    </Container>
  );
};

const Container = styled.div<{ width: number }>`
  width: 100px;
  height: ${props => props.width};

  border: 1px solid darkgray;
  border-radius: 3px;
  box-shadow: 0 1px gray;

  h4 {
    text-align: center;
    margin-top: 10px;
  }
`;

export default NavButton;
