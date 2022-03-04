import {
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { UserProvider } from '../../context/UserContext';
import App from '../../App';

jest.mock('../../context/UserContext');

test('testing that our login works', () => {
  render(
    <MemoryRouter>
      <UserProvider
        mockUser={{
          email: 'mintyst.john@gmail.com',
          id: '205e7e37-2fc8-4876-b3a3-3455158b0d1a',
        }}
      >
        <App />
      </UserProvider>
    </MemoryRouter>
  );

  const link = screen.getByRole('link', {
    name: /login/i,
  });

  userEvent.click(link);

  const userInput = screen.getByRole('textbox');

  const passwordInput = screen.getByPlaceholderText(/password/i);

  userEvent.type(userInput, 'mintyst.john@gmail.com');

  userEvent.type(passwordInput, 'password');

  const button = screen.getByRole('button', {
    name: /login/i,
  });

  userEvent.click(button);

  waitForElementToBeRemoved(button);

  const name = screen.findByRole('heading', {
    name: /@zackmami/i,
  });
  screen.debug();
  expect(name).toBeInTheDocument();
});
