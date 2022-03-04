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
          <p>
            Developer with a knack for user-interface design. Check out my
            photos!
          </p>
        </div>
        <div className={two}>
          <h1>
            Forest <Link to="/foresth">@foresth</Link>
          </h1>
          <p>
            Forest is a web developer in the Portland, OR area and appreciator
            of random pictures of foxes and cats.
          </p>
        </div>
      </div>
      <div className={secondRow}>
        <div className={three}>
          <h1>
            Karyssa <Link to="/ryssa">@ryssa</Link>
          </h1>
          <p>Full-stack web developer who loves sushi.</p>
        </div>
        <div className={four}>
          <h1>
            Zachary <Link to="/ZackMami">@ZackMami</Link>
          </h1>
          <p>
            Zach is a web developer in Portland, OR. He loves foraging for
            mushrooms with his dog. Zach loves when he forgets he is not muted
            and burps loudly over zoom. He loves when projects dont have CSS in
            the grading rubric.
          </p>
        </div>
      </div>
    </div>
  );
}
