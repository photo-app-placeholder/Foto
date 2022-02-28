import React, { useState } from 'react';
import styles from './AuthForm.css';

export default function AuthForm() {
  const [formState, setFormState] = useState({
    email: '',
    username: '',
    password: '',
  });

  const { auth } = styles;

  const handleSubmit = () => {
    // signUpUser OR signInUser
    // then
    // createProfile
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
      <label>Username:</label>
      <input
        type="text"
        placeholder="Username"
        value={formState.username}
        onChange={(e) =>
          setFormState({ ...formState, username: e.target.value })
        }
      />
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
