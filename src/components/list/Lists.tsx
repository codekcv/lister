import React from 'react';
import { connect } from 'react-redux';
import { AppState } from '../../store/store';
import { ListState } from '../../store/list/types';
import { addList } from '../../store/list/actions';
import styled from 'styled-components';
import ListLi from './List';
import { DragDropContext } from 'react-beautiful-dnd';
import { Card, CardState } from '../../store/card/types';
import { setCards, changeList } from '../../store/card/actions';

interface Props {
  listState: ListState;
  cardState: CardState;
  addList: typeof addList;
  setCards: typeof setCards;
  changeList: typeof changeList;
}

const Lists: React.FC<Props> = ({
  listState,
  cardState,
  addList,
  setCards,
  changeList
}) => {
  const { lists } = listState;

  const handleNewList = () => {
    addList('Untitled List');
  };

  const onDragEnd = (result: any) => {
    const { destination, source, draggableId } = result;

    if (
      !destination ||
      (destination.droppableId === source.droppableId &&
        destination.index === source.index)
    ) {
      return;
    }

    const { cards } = cardState;
    const draggedCard = cards.find(card => card.cardId === draggableId);
    const destinationListId = destination.droppableId;

    if (draggedCard !== undefined) {
      let orderedCards: Card[];

      if (destinationListId === draggedCard.listId) {
        orderedCards = cards.filter(card => card.listId === destinationListId);
        orderedCards.splice(source.index, 1);
        orderedCards.splice(destination.index, 0, draggedCard);
        orderedCards = [...orderedCards, ...cards].filter(
          (card, index, self) => self.indexOf(card) === index
        );
      } else {
        const fromCards: Card[] = cards.filter(
          card => card.listId === draggedCard.listId
        );

        const toCards: Card[] = cards.filter(
          card => card.listId === destinationListId
        );

        fromCards.splice(source.index, 1);
        toCards.splice(destination.index, 0, draggedCard);

        orderedCards = [...fromCards, ...toCards, ...cards].filter(
          (card, index, self) => self.indexOf(card) === index
        );

        changeList(draggedCard.cardId, destinationListId);
      }

      setCards(orderedCards);
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Container>
        {lists.map(list => (
          <div key={list.id}>
            <ListLi list={list} />
          </div>
        ))}
        <div className="button-div" onClick={handleNewList}>
          <button>+ Add a new list</button>
        </div>
      </Container>
    </DragDropContext>
  );
};

const Container = styled.div`
  display: flex;

  .button-div {
    background: rgba(255, 255, 255, 0.25);
    height: 30px;
    text-align: center;
    margin: var(--g-margin);
    border-radius: 3px;

    button {
      background: none;
      color: white;
      width: 300px;
      margin-top: 6px;
      border: none;
    }

    :hover {
      background: rgba(255, 255, 255, 0.45);
    }
  }

  .button-div textarea {
    width: 280px;
    padding: var(--g-padding);
  }
`;

const mapStateToProps = (state: AppState) => ({
  listState: state.list,
  cardState: state.card
});

export default connect(
  mapStateToProps,
  { addList, setCards, changeList }
)(Lists);
