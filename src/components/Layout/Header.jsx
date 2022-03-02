import React from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import { signOutUser } from '../../services/users';
import profileHook from '../../hooks/profileHook';
import profilePic from '../../assets/profile.png';
import styles from './Header.css';
const { home, usernameText } = styles;

export default function Header() {
  const { user, setUser } = useUser();
  const { profile } = profileHook();
  const { username } = profile[0] || '';

  const handleLogout = async () => {
    await signOutUser();
    setUser({});
  };
  return (
    <header>
      <div className={home}>
        <Link to="/">PhotoApp</Link>
      </div>
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
              <button onClick={handleLogout}>Log Out</button>
            </ul>
          </>
        )}
      </div>
    </header>
  );
}
