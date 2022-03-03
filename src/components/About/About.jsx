import React from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import styles from './About.css';
const { about, one, two, three, four, firstRow, secondRow } = styles;

export default function About() {
  return (
    <div className={about}>
      <div className={firstRow}>
        <div className={one}>
          <h1>
            Ckay <Link to="/ckay">@ckay</Link>
          </h1>
          <p>Me likey breadsticks</p>
        </div>
        <div className={two}>
          <h1>
            Forest <Link to="/user">@user</Link>
          </h1>
          <p>Huwwo</p>
        </div>
      </div>
      <div className={secondRow}>
        <div className={three}>
          <h1>
            Karyssa <Link to="/user">@user</Link>
          </h1>
          <p>Huwwo</p>
        </div>
        <div className={four}>
          <h1>
            Zachary <Link to="/user">@user</Link>
          </h1>
          <p>Huwwo</p>
        </div>
      </div>
    </div>
  );
}
