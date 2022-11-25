import { ListItem, Image } from './ImageGalleryItem.styled';
import { useState } from 'react';
import Modal from 'components/Modal';

function ImageGalleryItem({ smallPhoto, largePhoto, tags }) {
  const [isModalOpen, setModalStatus] = useState(false);

  const openModal = () => {
    setModalStatus(true);
    window.addEventListener('keydown', evt => {
      if (evt.code === 'Escape') {
        setModalStatus(false);
      }
    });
  };

  const closeModal = evt => {
    if (evt.currentTarget === evt.target) {
      setModalStatus(false);
    }
  };

  return (
    <>
      <ListItem onClick={openModal}>
        <Image src={smallPhoto} alt={tags} />
      </ListItem>
      {isModalOpen && (
        <Modal onClick={closeModal} largePhoto={largePhoto} tags={tags}></Modal>
      )}
    </>
  );
}

export default ImageGalleryItem;
