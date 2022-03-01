import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import { Route } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import { findAlbumById } from '../../services/albums';

export default function LockedRoute({ children, ...routeProps }) {
  const { user } = useUser();
  const params = useParams();
  const { album } = params;
  const [codeInput, setCodeInput] = useState('');
  const [albumCode, setAlbumCode] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const data = await findAlbumById(album);
      setAlbumCode(data.private_public);
    };
    fetchData();
  }, []);

  return (
    <Route
      {...routeProps}
      render={({ location }) =>
        user.email && albumCode === codeInput ? (
          children
        ) : (
          <form>
            <input
              type="password"
              value={codeInput}
              onChange={(e) => setCodeInput(e.target.value)}
            />
          </form>
          //   <Redirect to={{ pathname: '/login', state: { from: location } }} />
        )
      }
    />
  );
}
