import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Footer.css';

export default function Footer() {
  return (
    <footer>
      <div>
        © All Rights Reserved. 2022.{' '}
        <Link to="/about">Learn more about us here.</Link>
      </div>
    </footer>
  );
}
