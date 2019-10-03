import React from 'react';
import { crossCard, editCard, deleteCard } from '../../store/card/actions';
import { Card } from '../../store/card/types';
import styled from 'styled-components';

interface Props {
  card: Card;
  editCard: typeof editCard;
  deleteCard: typeof deleteCard;
  crossCard: typeof crossCard;
}

export const CardLi: React.FC<Props> = ({
  card,
  editCard,
  deleteCard,
  crossCard
}) => {
  const { cardId, text, cross } = card;

  // DONE CARD
  const handleDone = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    crossCard(cardId);
  };

  const handleHover = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    // deleteCard(cardId);
  };

  return (
    <Container onClick={handleDone}>
      <Span isCross={cross} onMouseEnter={handleHover}>
        {text}
      </Span>
    </Container>
  );
};

const Container = styled.div`
  width: 250px;
  background: white;
  border-radius: 3px;
  box-shadow: 0 2px lightgray;
  margin: 4px;
  text-indent: 16px;
`;

const Span = styled.span<{ isCross: boolean }>`
  text-decoration: ${props => props.isCross && 'line-through'};
`;
