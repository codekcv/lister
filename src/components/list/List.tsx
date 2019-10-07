import React, { useState, useEffect } from 'react';
import { List } from '../../store/list/types';
import { editList, deleteList, focusList } from '../../store/list/actions';
import Cards from '../card/Cards';
import styled from 'styled-components';
import Textarea from 'react-textarea-autosize';
import { FaPencilAlt, FaTrashAlt } from 'react-icons/fa';

interface Props {
  list: List;
  editList: typeof editList;
  deleteList: typeof deleteList;
  focusList: typeof focusList;
}

export const ListLi: React.FC<Props> = ({
  list,
  editList,
  deleteList,
  focusList: autofocusList
}) => {
  const { id, title, autofocus } = list;
  const [input, setInput] = useState('');
  const [editing, setEditing] = useState(false);
  const [hover, setHover] = useState(false);

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
    const val = title.trim();

    if (val) {
      editList(id, title);
    } else {
      editList(id, 'Untitled List');
    }

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

  //=== HOVER ===\\
  const handleMouseEnter = () => setHover(true);
  const handleMouseLeave = () => setHover(false);

  const handleListEdit = () => {
    setInput(title);
    setEditing(true);
  };

  const handleListDelete = () => {
    deleteList(id);
  };

  useEffect(() => {
    if (!autofocus) {
      autofocusList(id, true);
      setInput('');
      setEditing(true);
    }
    // eslint-disable-next-line
  }, []);

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
              <span className="button">
                <FaPencilAlt onClick={handleListEdit} />{' '}
                <FaTrashAlt onClick={handleListDelete} />
              </span>
            )}
          </i>
        </div>
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

      <Cards listId={id} />
    </Container>
  );
};

const Container = styled.div<{ isHover: boolean }>`
  background: #ebecf0;
  width: 300px;
  margin: var(--g-margin);
  padding: calc(var(--g-padding) * 2);
  border: 2px lightgray solid;
  border-radius: 3px;
  box-shadow: 0 4px lightgray;

  .list-textarea {
    font-size: 1.5rem;
    height: 45px;
    border: 1px pink solid;

    margin: var(--g-margin);
    padding: var(--g-padding);
    padding-left: 4px;
  }

  .title-area {
    position: relative;
    margin: var(--g-margin);
    padding: var(--g-padding);
  }

  .list-title {
    padding: var(--g-padding);
    overflow-wrap: break-word;
    word-wrap: break-word;
    font-size: 1.5rem;
  }

  .button {
    position: absolute;
    right: 8px;
    top: 8px;
  }
`;
