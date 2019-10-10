import React, { useState } from 'react';
import { List } from '../../store/list/types';
import { editList, deleteList, focusList } from '../../store/list/actions';
import Cards from '../card/Cards';
import styled from 'styled-components';
import Textarea from 'react-textarea-autosize';
import { FaPencilAlt, FaTrashAlt } from 'react-icons/fa';
import { AppState } from '../../store/store';
import { connect } from 'react-redux';
import { setCards } from '../../store/card/actions';
import { CardState } from '../../store/card/types';
import { Draggable } from 'react-beautiful-dnd';

interface Props {
  list: List;
  cardState: CardState;
  editList: typeof editList;
  deleteList: typeof deleteList;
  focusList: typeof focusList;
  setCards: typeof setCards;
  index: number;
}

const ListLi: React.FC<Props> = ({
  list,
  cardState,
  editList,
  deleteList,
  focusList,
  setCards,
  index
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
  };

  const handleFocus = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    const temp_value = e.target.value;
    e.target.value = '';
    e.target.value = temp_value;
  };

  const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    handleSubmit(e.target.value);
  };

  //=== BUTTON ===\\
  const [editing, setEditing] = useState(false);

  const handleListEdit = () => {
    setInput(title);
    setEditing(true);
  };

  const handleListDelete = () => {
    deleteList(id);
  };

  if (!autofocus) {
    focusList(id, true);
    setInput('');
    setEditing(true);
  }

  return (
    <Draggable draggableId={id} index={index} type="list">
      {provided => (
        <Container
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div className="title-area" {...provided.dragHandleProps}>
            {!editing ? (
              <>
                <p className="list-title">{title}</p>
                <i className="list-button">
                  <FaPencilAlt onClick={handleListEdit} />{' '}
                  <FaTrashAlt onClick={handleListDelete} />
                </i>
              </>
            ) : (
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
            )}
          </div>

          <Cards listId={id} adding={adding} />
        </Container>
      )}
    </Draggable>
  );
};

const Container = styled.div`
  background: #ebecf0;
  width: 300px;
  margin: var(--g-margin);
  padding: calc(var(--g-padding) * 2);
  border-radius: 3px;

  .title-area {
    position: relative;
    margin-bottom: 8px;

    :hover {
      .list-button {
        display: block;
      }
    }
  }

  .list-title {
    font-size: var(--g-text-title-size);
    font-weight: bold;
    overflow-wrap: break-word;
    word-wrap: break-word;
    margin-bottom: 8px;
    padding-left: var(--g-padding);
    padding-right: 1px;
  }

  .list-button {
    display: none;
    position: absolute;
    right: 4px;
    top: 0;
  }

  .list-textarea {
    width: 100%;
    font-weight: bold;
    font-size: var(--g-text-title-size);
    margin-top: -1px;
    margin-bottom: -5px;
    padding: 0 3px;
    border: 1px blue solid;
    border-radius: 3px;
  }
`;

const mapStateToProps = (state: AppState) => ({
  cardState: state.card
});

export default connect(
  mapStateToProps,
  { editList, deleteList, focusList, setCards }
)(ListLi);
