import React, { useState } from 'react';
import { createProfile } from '../../services/profiles';
import { signInUser, signUpUser } from '../../services/users';
import styles from './AuthForm.css';
import { useUser } from '../../context/UserContext';
import { useHistory } from 'react-router-dom';

export default function AuthForm({ isRegistering }) {
  const [formState, setFormState] = useState({
    email: '',
    username: '',
    password: '',
  });
  const { setUser } = useUser();
  const history = useHistory();

  const { auth } = styles;

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
        alert('Account created, please login.');
        history.push('/login');
      } else {
        let resp = await signInUser(formState.email, formState.password);
        setUser(resp);
        history.push(`/${formState.username}`);
      }
    } catch (error) {
      alert(`Login failed, please try again. error: ${error}`);
    }
  };

  return (
    <form className={auth} onSubmit={handleSubmit}>
      <label>Email:</label>
      <input
        type="email"
        placeholder="Email"
        value={formState.email}
        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
      />
      {isRegistering && (
        <>
          <label>Username:</label>
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
      <label>Password:</label>
      <input
        type="password"
        placeholder="Password"
        value={formState.password}
        onChange={(e) =>
          setFormState({ ...formState, password: e.target.value })
        }
      />
      <input type="submit" value="Login / Create Account" />
    </form>
  );
}
