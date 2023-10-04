import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from '../Button/Button';
import ImageGallery from '../ImageGallery/ImageGallery';
import Loader from '../Loader/Loader';
import Searchbar from '../Searchbar/Searchbar';
import searchImages from '../Api/api';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [totalHits, setTotalHits] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getImages() {
      setIsLoading(true);
      try {
        const { totalHits, hits } = await searchImages(searchQuery, page);
        setTotalHits(totalHits);
        setImages(prevImages => [...prevImages, ...hits]);
      } catch (error) {
        setError(error);
        toast.error(`Error catch ${error}`);
      } finally {
        setIsLoading(false);
      }
    }
    if (searchQuery || page > 1) {
      getImages();
    }
  }, [searchQuery, page]);

  const handleSubmit = value => {
    if (value !== '') {
      setSearchQuery(value);
      toast.success(`Search images ${value}`);
      setPage(1);
      setImages([]);
    }
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <>
      <Searchbar onSubmit={handleSubmit} />
      {images.length > 0 && <ImageGallery data={images} />}
      {isLoading && <Loader />}
      {images.length < totalHits && !isLoading && (
        <Button onBtnClick={handleLoadMore} />
      )}
      <ToastContainer autoClose={1000} />
    </>
  );
}
