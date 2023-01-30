import PropTypes from 'prop-types';
import { useEffect } from 'react';
import styles from './Modal.module.css';

const { Component } = require('react');

export default function Modal({ tags, largeImageURL, handleClose }) {
  const handleKeyDown = e => {
    if (e.code === 'Escape') {
      handleClose();
    }
  };

  const handleClick = e => {
    if (e.currentTarget === e.target) {
      handleClose();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className={styles.Overlay} onClick={handleClick}>
      <div className={styles.Modal}>
        <img src={largeImageURL} alt={tags} />
      </div>
    </div>
  );
}

Modal.propTypes = {
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};
