import React from 'react';
import AddImageForm from '../../../components/Forms/AddImageForm/AddImageForm';
import styles from './AddImage.css';

const { imageForm } = styles;

export default function AddImage() {
  return (
    <div className={imageForm}>
      <AddImageForm />
    </div>
  );
}
