import React from 'react';
import { connect } from 'react-redux';
import { AppState } from '../../store/store';
import { BoardState } from '../../store/board/types';
import Board from './Board';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { ListState } from '../../store/list/types';
import { CardState, Card } from '../../store/card/types';
import { setCards, changeList } from '../../store/card/actions';
import { changeOrder } from '../../store/list/actions';

interface Props {
  boardState: BoardState;
  listState: ListState;
  cardState: CardState;

  setCards: typeof setCards;
  changeList: typeof changeList;
  changeOrder: typeof changeOrder;
}

const Boards: React.FC<Props> = ({ boardState, listState, cardState }) => {
  const { boards } = boardState;

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
    } else if (type === 'list') {
      const draggedList = listState.lists.find(list => list.id === draggableId);

      if (draggedList) {
        const newListOrder = [...listState.lists];
        newListOrder.splice(source.index, 1);
        newListOrder.splice(destination.index, 0, draggedList);

        changeOrder(newListOrder);
      }
    } else if (type === 'board') {
    }
  };

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId={'lister'} type="board">
          {provided => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {boards.map((board, index) => (
                <Board board={board} index={index} />
              ))}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </>
  );
};

const mapStateToProps = (state: AppState) => ({
  boardState: state.board,
  listState: state.list,
  cardState: state.card
});

export default connect(
  mapStateToProps,
  { changeList, changeOrder, setCards }
)(Boards);
