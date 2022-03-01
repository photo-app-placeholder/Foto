import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import profileHook from '../../hooks/profileHook';
import { addAlbum } from '../../services/albums';

export default function AlbumForm() {
  const [title, setTitle] = useState('');
  const [privatePublic, setPrivatePublic] = useState(false);
  const [code, setCode] = useState('');
  const { user } = useUser();
  const history = useHistory();
  const { profile } = profileHook();
  console.log(user);

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
      history.push(`/${profile.username}`);
    } catch {
      throw new Error('something went wrong creating album');
    }
  };

  return (
    <form>
      <input
        type="text"
        value={title}
        placeholder="Album Title"
        onChange={(e) => setTitle(e.target.value)}
      />
      <label>
        Lock album?
        <input
          type="checkbox"
          checked={privatePublic}
          onChange={(e) => setPrivatePublic(e.target.value)}
        />
      </label>
      {privatePublic ? (
        <label>
          Album Password:
          <input
            type="password"
            name="code"
            value={code}
            minLength="4"
            onChange={(e) => setCode(e.target.value)}
          />
        </label>
      ) : null}
      <button onClick={handleSubmit}>Make Album</button>
    </form>
  );
}
