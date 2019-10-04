import React from 'react';
import styled from 'styled-components';
import Lists from '../components/list/Lists';
import { setCards } from '../store/card/actions';
import { connect } from 'react-redux';

interface Props {
  setCards: typeof setCards;
}

const Home: React.FC<Props> = ({ setCards }) => {
  const json = localStorage.getItem('data');

  if (json) {
    const data = JSON.parse(json);
    const {
      card: { cards }
    } = data;

    console.log(1, cards);
    setCards(cards);
  }

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

export default connect(
  null,
  { setCards }
)(Home);
