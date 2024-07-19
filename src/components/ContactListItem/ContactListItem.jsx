import PropTypes from 'prop-types';
import css from './ContactListItem.module.css';

export const ContactListItem = ({ filteredContact, deleteContact }) => {
  // handleDelete method
  const handleDelete = () => {
    deleteContact(filteredContact.id);
  };

  return (
    <li className={css.items}>
      <p>{filteredContact.name}:</p>
      <p>{filteredContact.number}</p>
      <button onClick={handleDelete}>Delete</button>
    </li>
  );
};

ContactListItem.propTypes = {
  filteredContact: PropTypes.object.isRequired,
  deleteContact: PropTypes.func.isRequired,
};
