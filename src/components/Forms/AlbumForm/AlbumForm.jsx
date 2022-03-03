import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useUser } from '../../../context/UserContext';
import profileHook from '../../../hooks/profileHook';
import { addAlbum } from '../../../services/albums';
import styles from './AlbumForm.css';

const { albumForm, check, disabled, inputs } = styles;

export default function AlbumForm() {
  const [title, setTitle] = useState('');
  const [privatePublic, setPrivatePublic] = useState(false);
  const [code, setCode] = useState('');
  const { user } = useUser();
  const history = useHistory();
  const { profile } = profileHook();
  const { username } = profile[0];

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      await addAlbum({
        title: title,
        private_public: privatePublic,
        code: code,
        user_id: user.id,
      });
      alert(`${title} has been created.`);
      history.push(`/${username}`);
    } catch {
      throw new Error('something went wrong creating album');
    }
  };

  return (
    <div className={albumForm}>
      <form>
        <input
          className={inputs}
          type="text"
          value={title}
          placeholder="Album Title"
          onChange={(e) => setTitle(e.target.value)}
        />
        {}
        <div className={check}>
          <label>
            Make Private
            <input
              type="checkbox"
              checked={privatePublic}
              onClick={() => setPrivatePublic(!privatePublic)}
            />
          </label>
        </div>
        {privatePublic ? (
          <input
            className={inputs}
            type="password"
            name="code"
            placeholder="Access Code"
            minLength="4"
            onChange={(e) => setCode(e.target.value)}
          />
        ) : (
          <input
            className={disabled}
            type="password"
            name="code"
            value={code}
            placeholder="Access Code"
            minLength="4"
            readOnly
          />
        )}
        <button onClick={handleSubmit}>Create</button>
      </form>
    </div>
  );
}
