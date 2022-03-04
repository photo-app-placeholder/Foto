import {
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';

import { MemoryRouter } from 'react-router-dom';
import { UserProvider } from '../../../context/UserContext';

import AlbumView from './AlbumView';

jest.mock('../../../context/UserContext');

test('album view test', async () => {
  render(
    <MemoryRouter>
      <UserProvider
        mockUser={{
          id: '53c3d634-a190-4715-8159-7673b247299b',
          email: 'a@b.com',
        }}
      >
        <AlbumView />
      </UserProvider>
    </MemoryRouter>
  );

  const spinner = document.querySelector('.spinner');
  waitForElementToBeRemoved(spinner);
});
