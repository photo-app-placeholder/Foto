import React from 'react';
import styles from './About.jsx';
const { about, one, two, three, four } = styles;

export default function About() {
  return (
    <div className={about}>
      <h1>About</h1>
      <div className={one}></div>
      <div className={two}></div>
      <div className={three}></div>
      <div className={four}></div>
    </div>
  );
}
