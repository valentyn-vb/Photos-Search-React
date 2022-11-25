import ImageGalleryItem from 'components/ImageGalleryItem';
import LoadMoreBtn from 'components/Load More Btn';
import Loader from 'components/Loader/Loader';
import { useState, useEffect, useRef } from 'react';
import { GalleryList } from './ImageGallery.styled';
import api from '../../Services/api';

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

function ImageGallery({ searchQuery }) {
  const [photos, setPhotos] = useState([]);
  const [status, setStatus] = useState('');
  const [page, setPage] = useState(1);

  const prevSearchQuery = usePrevious(searchQuery);

  useEffect(() => {
    if (searchQuery === '') {
      return;
    }

    if (prevSearchQuery !== searchQuery) {
      setPhotos([]);
      setPage(1);
      setStatus('idle');
      return;
    }

    setStatus('pending');

    api
      .fetchPhotos(searchQuery, page)
      .then(images => {
        if (images.hits.length === 0) {
          setStatus('rejected');
          throw new Error('No images');
        }

        setPhotos(prevState => [...prevState, ...images.hits]);
        setStatus('resolved');
      })
      .catch(error => console.warn(error));
  }, [searchQuery, page, prevSearchQuery]);

  const handelBtnClick = () => {
    setPage(prevState => prevState + 1);
  };

  if (status === 'idle') {
    return (
      <h2 style={{ textAlign: 'center', marginTop: 15 }}>
        Enter a search query in the search field
      </h2>
    );
  }

  return (
    <>
      {photos.length > 0 && (
        <GalleryList>
          {photos.map(image => (
            <ImageGalleryItem
              key={image.id}
              tags={image.tags}
              smallPhoto={image.webformatURL}
              largePhoto={image.largeImageURL}
            ></ImageGalleryItem>
          ))}
        </GalleryList>
      )}

      {status === 'pending' && <Loader />}

      {status === 'resolved' && (
        <LoadMoreBtn type="submit" onClick={handelBtnClick} />
      )}

      {status === 'rejected' && (
        <h2 style={{ textAlign: 'center', marginTop: 15 }}>
          Sorry, no images were found for this search query
        </h2>
      )}
    </>
  );
}

export default ImageGallery;
