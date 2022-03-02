import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { UserProvider } from '../../../context/UserContext';
import AlbumForm from './AlbumForm';

test('should display a form to add images', () => {
  const { container } = render(
    <UserProvider>
      <MemoryRouter>
        <AlbumForm />
      </MemoryRouter>
    </UserProvider>
  );
  expect(container).toMatchSnapshot();
});
