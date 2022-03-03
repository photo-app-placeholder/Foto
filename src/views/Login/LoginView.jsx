import React from 'react';
import AuthForm from '../../components/Forms/AuthForm/AuthForm';
import styles from './LoginView.css';
const { loginView } = styles;

export default function LoginView({ isRegistering = false }) {
  return (
    <div className={loginView}>
      <h1>{isRegistering ? 'Create An Account' : 'Login'}</h1>
      <AuthForm isRegistering={isRegistering} />
    </div>
  );
}
