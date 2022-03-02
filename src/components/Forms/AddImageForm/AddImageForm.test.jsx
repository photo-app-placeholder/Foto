import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { UserProvider } from '../../../context/UserContext';
import AddImageForm from './AddImageForm';

test('should display a form to add images', () => {
  const { container } = render(
    <UserProvider>
      <MemoryRouter>
        <AddImageForm />
      </MemoryRouter>
    </UserProvider>
  );
  expect(container).toMatchSnapshot();
});
