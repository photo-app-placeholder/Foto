import React, { useState } from 'react';
import { createProfile } from '../../services/profiles';
import { signInUser, signUpUser } from '../../services/users';
import styles from './AuthForm.css';
import { useUser } from '../../context/UserContext';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

const { auth, terms } = styles;
export default function AuthForm({ isRegistering }) {
  const [formState, setFormState] = useState({
    email: '',
    username: '',
    password: '',
  });
  const { setUser } = useUser();
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isRegistering) {
        let resp = await signUpUser(formState.email, formState.password);
        console.log(resp);
        await createProfile({
          username: formState.username,
          bio: '',
          user_id: resp.id,
        });
        alert('Email confirmation sent, confirm email address then log in.');
        history.push('/login');
      } else {
        let resp = await signInUser(formState.email, formState.password);
        setUser(resp);
        window.location.replace(`/${formState.username}`);
      }
    } catch (error) {
      alert(`Login failed, please try again. error: ${error}`);
    }
  };

  return (
    <form className={auth} onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Email"
        value={formState.email}
        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
      />
      {isRegistering && (
        <>
          <input
            type="text"
            placeholder="Username"
            value={formState.username}
            onChange={(e) =>
              setFormState({ ...formState, username: e.target.value })
            }
          />
        </>
      )}

      <input
        type="password"
        placeholder="Password"
        value={formState.password}
        onChange={(e) =>
          setFormState({ ...formState, password: e.target.value })
        }
      />
      {isRegistering && (
        <p className={terms}>
          By signing up, you agree not to upload photos that contain graphic or
          disturbing imagery that may be against the law.
        </p>
      )}
      <button type="submit">{isRegistering ? 'Sign Up' : 'Login'}</button>
      {isRegistering ? (
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      ) : (
        <p>
          New? <Link to="/register">Register</Link>
        </p>
      )}
    </form>
  );
}
