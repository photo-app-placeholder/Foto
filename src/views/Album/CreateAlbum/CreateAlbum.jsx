import React from 'react';
import AlbumForm from '../../../components/Forms/AlbumForm';
import styles from './CreateAlbum.css';

const { createAlbumView } = styles;

export default function CreateAlbum() {
  return (
    <div className={createAlbumView}>
      <h1>Create Album</h1>
      <AlbumForm />
    </div>
  );
}
