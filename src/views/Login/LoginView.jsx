import React from 'react';
import Login from '../../components/Login/Login';

export default function LoginView({ isRegistering = false }) {
  return (
    <div>
      <Login />
    </div>
  );
}
