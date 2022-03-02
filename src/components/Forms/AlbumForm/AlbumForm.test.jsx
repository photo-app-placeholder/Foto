import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { UserProvider } from '../../../context/UserContext';
import AlbumForm from './AlbumForm';

test('should display a form to create an album', () => {
  const { container } = render(
    <UserProvider>
      <MemoryRouter>
        <AlbumForm />
      </MemoryRouter>
    </UserProvider>
  );
  expect(container).toMatchSnapshot();
});
