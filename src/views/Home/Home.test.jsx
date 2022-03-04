import { render, screen } from '@testing-library/react';

import { MemoryRouter } from 'react-router-dom';
import App from '../../App';
import { UserProvider } from '../../context/UserContext';

jest.mock('../../context/UserContext');

test('testing that our login works', async () => {
  render(
    <MemoryRouter>
      <UserProvider mockUser={{ id: 1, email: 'test@test.com' }}>
        <App />
      </UserProvider>
    </MemoryRouter>
  );

  const img = await screen.findAllByRole('link');

  expect(img[0]).toBeInTheDocument();
});
