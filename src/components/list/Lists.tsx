import React from 'react';
import { connect } from 'react-redux';
import { AppState } from '../../store/store';
import { ListState } from '../../store/list/types';
import { addList, changeOrder } from '../../store/list/actions';
import styled from 'styled-components';
import ListLi from './List';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { Card, CardState } from '../../store/card/types';
import { setCards, changeList } from '../../store/card/actions';

interface Props {
  listState: ListState;
  cardState: CardState;
  addList: typeof addList;
  setCards: typeof setCards;
  changeList: typeof changeList;
  changeOrder: typeof changeOrder;
}

const Lists: React.FC<Props> = ({
  listState,
  cardState,
  addList,
  setCards,
  changeList,
  changeOrder
}) => {
  const { lists } = listState;

  const handleNewList = () => {
    addList('Untitled List');
  };

  const onDragEnd = (result: any) => {
    const { destination, source, draggableId, type } = result;

    if (
      !destination ||
      (destination.droppableId === source.droppableId &&
        destination.index === source.index)
    ) {
      return;
    }

    if (type === 'card') {
      const { cards } = cardState;
      const draggedCard = cards.find(card => card.cardId === draggableId);
      const destinationListId = destination.droppableId;

      if (draggedCard) {
        let orderedCards: Card[];

        if (destinationListId === draggedCard.listId) {
          orderedCards = cards.filter(
            card => card.listId === destinationListId
          );
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
    } else {
      const draggedList = listState.lists.find(list => list.id === draggableId);

      if (draggedList) {
        const newListOrder = [...listState.lists];
        newListOrder.splice(source.index, 1);
        newListOrder.splice(destination.index, 0, draggedList);

        changeOrder(newListOrder);
      }
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Container>
        <Droppable droppableId={'board1'} direction="horizontal" type="list">
          {provided => (
            <div
              className="lists"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {lists.map((list, index) => (
                <div key={list.id}>
                  <ListLi list={list} index={index} />
                </div>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        <div className="button-div" onClick={handleNewList}>
          <button>+ Add a new list</button>
        </div>
      </Container>
    </DragDropContext>
  );
};

const Container = styled.div`
  display: flex;

  .lists {
    display: flex;
  }

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
  { addList, setCards, changeList, changeOrder }
)(Lists);
