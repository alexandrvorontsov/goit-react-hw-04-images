import Notiflix from 'notiflix';
import Button from '../Button/Button';
import ImageGallery from '../ImageGallery/ImageGallery';
import Loader from '../Loader/Loader';
import Searchbar from '../Searchbar/Searchbar';
import searchImages from '../Api/api';
import { useState } from 'react';
import { useEffect } from 'react';

export function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [totalHits, setTotalHits] = useState(0);
  const [isLoading, setiSLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = value => {
    setSearchQuery(value);
    setImages([]);
    setPage(1);
    setTotalHits(0);
    setiSLoading(false);
    setError(false);
  };

  const getImages = async () => {
    setiSLoading(true);

    const { totalHits, hits } = await searchImages(searchQuery, page);

    setImages(prevImages => [...prevImages, ...hits]);
    setTotalHits(totalHits);
    setiSLoading(false);
  };

  const onBtnClick = () => {
    if (page <= totalHits / 12 + 1) {
      setPage(page => page + 1);
    }
  };

  useEffect(() => {
    getImages();
  }, [searchQuery, page]);

  return (
    <>
      <Searchbar onSubmit={handleSubmit} />
      {images?.length > 0 && <ImageGallery data={images} />}
      {isLoading && <Loader />}
      {images.length > 0 && !isLoading && <Button onBtnClick={onBtnClick} />}
    </>
  );
}
