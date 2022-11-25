import { useState } from 'react';
import Searchbar from '../Searchbar';
import ImageGallery from '../ImageGallery';

export function App() {
  const [searchQuery, setSearchQuery] = useState('');

  const handelFormSubmit = searchTerm => {
    setSearchQuery(searchTerm);
  };

  return (
    <>
      <Searchbar onSubmit={handelFormSubmit}></Searchbar>
      <ImageGallery searchQuery={searchQuery}></ImageGallery>
    </>
  );
}
