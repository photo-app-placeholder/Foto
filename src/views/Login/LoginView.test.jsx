import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import LoginView from './LoginView';
import { UserProvider } from '../../context/UserContext';
import App from '../../App';

test('testing that our login works', async () => {
  render(
    <UserProvider>
      <App />
    </UserProvider>
  );

  const loginButton = screen.getByRole('link', {
    name: /login/i,
  });

  userEvent.click(loginButton);

  const userInput = screen.getByRole('textbox');

  const passwordInput = screen.getByPlaceholderText(/password/i);

  userEvent.type(userInput, 'mintyst.john@gmail.com');

  userEvent.type(passwordInput, 'password');

  const button = screen.getByRole('button');
  screen.debug(button);
  userEvent.click(button);

  const name = await screen.findByRole('heading', {
    name: /@zackmami/i,
  });

  //   expect(name).toBeInTheDocument();
});
