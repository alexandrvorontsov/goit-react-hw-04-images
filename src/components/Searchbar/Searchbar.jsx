import PropTypes from 'prop-types';
import { useState } from 'react';
import styles from './Searchbar.module.css';

export default function Searchbar({ onSubmit }) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleChange = evt => {
    const { value } = evt.currentTarget;
    setSearchQuery(value);
  };

  const handleSubmit = evt => {
    evt.preventDefault();
    onSubmit(searchQuery);
    resetForm();
  };

  const resetForm = () => setSearchQuery('');

  return (
    <header className={styles.Searchbar}>
      <form className={styles.SearchForm} onSubmit={handleSubmit}>
        <button type="submit" className={styles.SearchForm_button}>
          <span className={styles.SearchForm_button_label}>Search</span>
        </button>

        <input
          className={styles.SearchForm_input}
          type="text"
          autoComplete="off"
          placeholder="Search images and photos"
          onChange={handleChange}
          value={searchQuery}
          name="searchQuery"
          autoFocus
        />
      </form>
    </header>
  );
}

Searchbar.propTypes = { onSubmit: PropTypes.func.isRequired };
