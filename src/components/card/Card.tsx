export default () => null;

// import React, { useState } from 'react';
// import { editCard, deleteCard } from '../../store/list/actions';
// import { FaPencilAlt, FaTrashAlt } from 'react-icons/fa';
// import styled from 'styled-components';

// interface Props {
//   id: string;
//   text: string;
//   editCard: typeof editCard;
//   deleteCard: typeof deleteCard;
// }

// export const Card: React.FC<Props> = ({ id, text, editCard, deleteCard }) => {
//   const [edit, setEdit] = useState(false);
//   const [value, setValue] = useState('');

//   const handleClick = () => {
//     setEdit(true);
//     setValue(text);
//   };

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setValue(e.target.value);
//   };

//   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     editCard(id, value);
//     setEdit(false);
//   };

//   const handleDelete = (e: React.MouseEvent<SVGElement, MouseEvent>) => {
//     deleteCard(id);
//   };

//   return (
//     <Container>
//       {!edit ? (
//         <div className="card">
//           <label>{text}</label>
//           <div className="buttons">
//             <FaPencilAlt onClick={handleClick} />{' '}
//             <FaTrashAlt onClick={handleDelete} />
//           </div>
//         </div>
//       ) : (
//         <>
//           <form onSubmit={handleSubmit}>
//             <input
//               type="text"
//               placeholder="Edit..."
//               value={value}
//               onChange={handleChange}
//             />
//             <button type="submit">Done</button>
//           </form>
//         </>
//       )}
//     </Container>
//   );
// };

// const Container = styled.div`
//   .card {
//     display: flex;
//     justify-content: space-between;
//     padding: 4px;
//   }

//   /* .buttons {
//     flex-grow: 1;
//   } */
// `;
