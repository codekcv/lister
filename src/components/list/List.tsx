import React, { useState } from 'react';
import { connect } from 'react-redux';
import { ListState } from '../../store/list/types';
import { AppState } from '../../store/store';
import { addCard } from '../../store/list/actions';

interface Props {
  listState: ListState;
  addCard: typeof addCard;
}

const List: React.FC<Props> = ({ listState, addCard }) => {
  const [input, setInput] = useState('');
  const { title, cards } = listState;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleAddCard = () => {
    addCard('4', input);
    setInput('');
  };

  return (
    <div>
      <h1>{title}</h1>
      <ul>
        {cards.map(card => (
          <li key={card.id}>{card.text}</li>
        ))}
      </ul>
      <input
        type="text"
        placeholder="Add card..."
        value={input}
        onChange={handleChange}
      />
      <button onClick={handleAddCard}>Add Card</button>
    </div>
  );
};

const mapStateToProps = (state: AppState) => ({
  listState: state.list
});

export default connect(
  mapStateToProps,
  { addCard }
)(List);
