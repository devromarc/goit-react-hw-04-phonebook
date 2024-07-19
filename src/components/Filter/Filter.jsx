import PropTypes from 'prop-types';
import css from './Filter.module.css';

export const Filter = ({ filter, setFilter }) => {
  //filter name based on the the search keyword
  const handleFilterChange = e => {
    setFilter(e.target.value);
  };

  return (
    <div className={css.filterContainer}>
      <p>Find Contacts by Name</p>
      <input
        type="text"
        name="filter"
        placeholder="Search by name"
        value={filter}
        onChange={handleFilterChange}
      />
    </div>
  );
};

Filter.propTypes = {
  filter: PropTypes.string.isRequired,
  setFilter: PropTypes.func.isRequired,
};
