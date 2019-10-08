import React, { useState } from 'react';
import { List } from '../../store/list/types';
import {
  editList,
  deleteList,
  focusList,
  currentlyAdding
} from '../../store/list/actions';
import Cards from '../card/Cards';
import styled from 'styled-components';
import Textarea from 'react-textarea-autosize';
import { FaPencilAlt, FaTrashAlt } from 'react-icons/fa';
import { DragDropContext } from 'react-beautiful-dnd';

interface Props {
  list: List;
  editList: typeof editList;
  deleteList: typeof deleteList;
  focusList: typeof focusList;
  currentlyAdding: typeof currentlyAdding;
}

export const ListLi: React.FC<Props> = ({
  list,
  editList,
  deleteList,
  focusList,
  currentlyAdding
}) => {
  const { id, title, autofocus, adding } = list;

  //=== Text Area ===\\
  const [input, setInput] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };

  const handleEnter = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      setInput('');
      handleSubmit(input);
    }
  };

  const handleSubmit = (title: string) => {
    title.trim() ? editList(id, title) : editList(id, 'Untitled List');
    setEditing(false);
    setHover(false);
  };

  const handleFocus = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    const temp_value = e.target.value;
    e.target.value = '';
    e.target.value = temp_value;
  };

  const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    handleSubmit(e.target.value);
  };

  //=== HOVER ===\\
  const [hover, setHover] = useState(false);

  const handleMouseEnter = () => setHover(true);
  const handleMouseLeave = () => setHover(false);

  //=== BUTTON ===\\
  const [editing, setEditing] = useState(false);

  const handleListEdit = () => {
    setInput(title);
    setEditing(true);
  };

  const handleListDelete = () => {
    deleteList(id);
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
  };

  if (!autofocus) {
    focusList(id, true);
    setInput('');
    setEditing(true);
  }

  return (
    <Container isHover={hover}>
      {!editing ? (
        <div
          className="title-area"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <p className="list-title">{title}</p>
          <i>
            {hover && (
              <span className="list-button">
                <FaPencilAlt onClick={handleListEdit} />{' '}
                <FaTrashAlt onClick={handleListDelete} />
              </span>
            )}
          </i>
        </div>
      ) : (
        <div className="list-textarea-container">
          <Textarea
            className="list-textarea"
            value={input}
            placeholder="Enter new title..."
            onChange={handleChange}
            onKeyDown={handleEnter}
            onFocus={handleFocus}
            onBlur={handleBlur}
            autoFocus
          />
        </div>
      )}

      <DragDropContext onDragEnd={onDragEnd}>
        <Cards listId={id} currentlyAdding={currentlyAdding} adding={adding} />
      </DragDropContext>
    </Container>
  );
};

const Container = styled.div<{ isHover: boolean }>`
  background: #ebecf0;
  width: 300px;
  margin: var(--g-margin);
  padding: calc(var(--g-padding) * 2);
  border-radius: 3px;

  .title-area {
    position: relative;
  }

  .list-title {
    font-weight: bold;
    overflow-wrap: break-word;
    word-wrap: break-word;
    padding-left: var(--g-padding);
    padding-right: 1px;
  }

  .list-button {
    position: absolute;
    right: 4px;
    top: 0px;
  }

  .list-textarea-container {
    width: auto;
  }

  .list-textarea {
    width: 100%;
    font-weight: bold;
    font-size: 1rem;
    margin-top: -1px;
    margin-bottom: -5px;
    padding: 0 3px;
    border: 1px blue solid;
    border-radius: 3px;
  }
`;
