import { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from '../Button/Button';
import ImageGallery from '../ImageGallery/ImageGallery';
import Loader from '../Loader/Loader';
import Searchbar from '../Searchbar/Searchbar';
import searchImages from '../Api/api';

const initState = {
  searchQuery: '',
  images: [],
  page: 1,
  totalHits: 0,
  isLoading: false,
  error: null,
};

export default function App() {
  const [state, setState] = useState({ ...initState });

  const handleSubmit = value => {
    setState({
      ...initState,
      searchQuery: value,
    });
  };

  const onBtnClick = () => {
    const { totalHits, page } = state;

    if (page <= totalHits / 12 + 1) {
      setState(prevState => ({
        ...prevState,
        page: prevState.page + 1,
      }));
    }
  };

  const getImages = async () => {
    const { searchQuery, page } = state;
    setState({
      ...state,
      isLoading: true,
    });

    try {
      const { totalHits, hits } = await searchImages(searchQuery, page);

      setState(prevState => ({
        ...prevState,
        images: [...prevState.images, ...hits],
        totalHits,
        isLoading: false,
      }));
    } catch (error) {
      setState({
        ...state,

        isLoading: false,
        error,
      });
    }
  };

  useEffect(() => {
    const { searchQuery, page } = state;
    getImages(searchQuery, page);
  }, [searchQuery, page]);

  const { images, isLoading, totalHits } = state;

  return (
    <>
      <Searchbar onSubmit={handleSubmit} />
      {images?.length > 0 && <ImageGallery data={images} />}
      {isLoading && <Loader />}
      {images.length < totalHits && !isLoading && (
        <Button onBtnClick={onBtnClick} />
      )}
      <ToastContainer autoClose={3000} />
    </>
  );
}
