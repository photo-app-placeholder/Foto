import React from 'react';
import AuthForm from '../../components/Forms/AuthForm';

export default function LoginView({ isRegistering = false }) {
  return (
    <div>
      {isRegistering ? 'Register' : 'Login'}
      <AuthForm isRegistering={isRegistering} />
    </div>
  );
}
