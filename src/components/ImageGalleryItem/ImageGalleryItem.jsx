import { useState } from 'react';
import PropTypes from 'prop-types';
import Modal from 'components/Modal/Modal';
import styles from './ImageGalleryItem.module.css';

export default function ImageGalleryItem({
  id,
  tags,
  webformatUrl,
  largeImageUrl,
  handleClose,
}) {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const onModal = () => setModalIsOpen(!modalIsOpen);

  return (
    <li className={styles.ImageGalleryItem}>
      <img
        className={styles.ImageGalleryItem_image}
        id={id}
        alt={tags}
        src={webformatUrl}
        onClick={onModal}
      />
      {modalIsOpen && (
        <Modal
          tags={tags}
          largeImageURL={largeImageUrl}
          handleClose={onModal}
        />
      )}
    </li>
  );
}

ImageGalleryItem.propTypes = {
  webformatUrl: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  largeImageUrl: PropTypes.string.isRequired,
};
