import React from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import { signOutUser } from '../../services/users';
import profileHook from '../../hooks/profileHook';
import profilePic from '../../assets/profile.png';
import styles from './Header.css';
import { useHistory } from 'react-router-dom';
const { home, usernameText, logout } = styles;

export default function Header() {
  const { user, setUser } = useUser();
  const { profile } = profileHook();
  const { username } = profile[0] || '';
  const history = useHistory();

  const handleLogout = async () => {
    await signOutUser();
    setUser({});
    history.push('/');
  };
  return (
    <header>
      <h1 className={home}>
        <Link to="/">Foto.</Link>
      </h1>
      <div>
        {!user.email && (
          <>
            <ul>
              <Link to="/login">
                <li>Login</li>
              </Link>
              <Link to="/register">
                <li>Register</li>
              </Link>
            </ul>
          </>
        )}
        {user.email && (
          <>
            <ul>
              <h4 className={usernameText}>@{username}</h4>
              <Link to={`/${username}`}>
                <img src={profilePic} />
              </Link>
              <button className={logout} onClick={handleLogout}>
                Log Out
              </button>
            </ul>
          </>
        )}
      </div>
    </header>
  );
}
