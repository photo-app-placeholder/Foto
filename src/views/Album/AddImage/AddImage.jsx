import React from 'react';
import AddImageForm from '../../../components/Forms/AddImageForm';
import styles from './AddImage.css';

const { imageForm } = styles;

export default function AddImage() {
  return (
    <div className={imageForm}>
      <h1>Add Photo</h1>
      <AddImageForm />
    </div>
  );
}
