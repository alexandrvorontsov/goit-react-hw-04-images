import Modal from 'components/Modal/Modal';
import styles from './ImageGalleryItem.module.css';

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
      <Modal tags={tags} largeImageURL={largeImageUrl} handleClose={onModal} />
    )}
  </li>
);
