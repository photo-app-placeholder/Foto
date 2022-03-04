import {
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { UserProvider } from '../../context/UserContext';
import App from '../../App';

import { rest } from 'msw';
import { setupServer } from 'msw/node';

import photoArray from './fixtures/photoArray.json';

// jest.mock('../../services/users.js');

const getProfile = rest.get(
  'https://enluotcdncgmywquucnd.supabase.co/rest/v1/profiles',
  (req, res, ctx) => {
    return res(
      ctx.json([
        {
          user_id: '53c3d634-a190-4715-8159-7673b247299b',
          created_at: '2022-03-02T16:36:32.748338+00:00',
          bio: '',
          username: 'AatBdotCom',
        },
      ])
    );
  }
);

const getRandomPhotos = rest.get(
  'https://enluotcdncgmywquucnd.supabase.co/rest/v1/photoTable',
  (req, res, ctx) => {
    return res(ctx.json(photoArray));
  }
);

const getAuthToken = rest.get(
  'https://enluotcdncgmywquucnd.supabase.co/auth/v1/token',
  (req, res, ctx) => {
    return res(
      ctx.json({ id: '53c3d634-a190-4715-8159-7673b247299b', email: 'a@b.com' })
    );
  }
);

const server = setupServer(getProfile, getRandomPhotos, getAuthToken);

beforeAll(() => {
  server.listen();
});

afterAll(() => {
  server.close();
});

test('testing that our login works', () => {
  render(
    <MemoryRouter>
      <UserProvider>
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

  userEvent.type(userInput, 'a@b.com');

  userEvent.type(passwordInput, '123456');

  const button = screen.getByRole('button', {
    name: /login/i,
  });

  userEvent.click(button);

  waitForElementToBeRemoved(button);

  const name = screen.findByRole('heading', {
    name: /@AatBdotCom/i,
  });
  screen.debug();
  expect(name).toBeInTheDocument();
});
