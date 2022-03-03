import {
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import LoginView from './LoginView';
import { UserProvider } from '../../context/UserContext';
import App from '../../App';

// jest.mock('../../context/UserContext');

const server = setupServer(
  rest.get(
    'https://enluotcdncgmywquucnd.supabase.co/auth/v1/token?grant_type=password',
    (req, res, ctx) => {
      return res(
        ctx.json({
          id: '205e7e37-2fc8-4876-b3a3-3455158b0d1a',
          email: 'mintyst.john@gmail.com',
        })
      );
    }
  )
);

beforeAll(() => server.listen());

afterAll(() => server.close());

test('testing that our login works', async () => {
  render(
    <UserProvider
    // mockUser={{
    //   id: '205e7e37-2fc8-4876-b3a3-3455158b0d1a',
    //   email: 'mintyst.john@gmail.com',
    // }}
    >
      <MemoryRouter>
        <App />
      </MemoryRouter>
    </UserProvider>
  );

  const loginButton = screen.getByRole('link', {
    name: /login/i,
  });

  // waitForElementToBeRemoved(loading);

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
