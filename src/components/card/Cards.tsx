import React from 'react';
import { connect } from 'react-redux';
import { CardState } from '../../store/card/types';
import {
  addCard,
  crossCard,
  deleteCard,
  editCard,
  initCard
} from '../../store/card/actions';
import { AppState } from '../../store/store';
import { CardLi } from './Card';
import styled from 'styled-components';
import { currentlyAdding } from '../../store/list/actions';
import { Droppable } from 'react-beautiful-dnd';

interface Props {
  listId: string;
  cardState: CardState;
  addCard: typeof addCard;
  editCard: typeof editCard;
  deleteCard: typeof deleteCard;
  crossCard: typeof crossCard;
  initCard: typeof initCard;
  currentlyAdding: typeof currentlyAdding;
  adding: boolean;
}

const Cards: React.FC<Props> = ({
  listId,
  cardState,
  addCard,
  editCard,
  deleteCard,
  crossCard,
  initCard,
  currentlyAdding,
  adding
}) => {
  const listCards = cardState.cards.filter(card => card.listId === listId);

  const handleClick = () => {
    addCard(listId);
    currentlyAdding(listId, true);
  };

  return (
    <Container>
      <ul>
        <Droppable droppableId={listId}>
          {provided => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {listCards.map((card, index) => (
                <li key={card.cardId}>
                  <CardLi
                    card={card}
                    editCard={editCard}
                    deleteCard={deleteCard}
                    crossCard={crossCard}
                    initCard={initCard}
                    currentlyAdding={currentlyAdding}
                    index={index}
                  />
                </li>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </ul>
      <div className="textarea-container">
        {!adding && <button onClick={handleClick}>+ Add a card</button>}
      </div>
    </Container>
  );
};

const Container = styled.div`
  button {
    background: none;
    color: gray;
    width: 100%;
    height: 30px;
    border: none;
    border-radius: 3px;
    margin: 0;
    margin-bottom: 1px;
    padding: 0;
  }
  button:hover {
    background: lightgray;
    text-decoration: underline;
  }

  textarea {
    font-size: 1rem;
  }

  .textarea-container {
    width: auto;
    margin: var(--g-margin) 0;
  }

  .add-card-textarea {
    width: 100%;
    padding: calc(var(--g-padding) * 2);
    border: 1px rgba(255, 255, 255, 0.5) solid;
  }
`;

const mapStateToProps = (state: AppState) => ({
  cardState: state.card
});

export default connect(
  mapStateToProps,
  { addCard, editCard, deleteCard, crossCard, initCard }
)(Cards);
