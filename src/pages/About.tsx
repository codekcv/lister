import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

interface Props {}

export const About: React.FC<Props> = () => {
  return (
    <Container>
      <h1>Lister Note</h1>
      <p>This is a React app for organizing notes. It is based on Trello.</p>
      <p>Version: 1.0.0</p>
      <div>
        <ul>
          <li>
            <a href="https://twitter.com/villamin_c">@villamin_c</a>
          </li>
          <li>
            <Link to="/">Go Back</Link>
          </li>
        </ul>
      </div>

      <div></div>
    </Container>
  );
};

const Container = styled.div`
  background: white;
  border-radius: 3px;

  margin: 8px auto;
  padding: 8px;
  max-width: 600px;

  ul {
    display: flex;
    justify-content: flex-start;
    margin-right: 20px;
    padding-top: 20px;
    margin-bottom: 10px;
  }

  a {
    text-decoration: none;
    margin-right: 30px;
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
`;
