import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { UserProvider } from '../../../context/UserContext';
import AuthForm from './AuthForm';

test('should display a form to add images', () => {
  const { container } = render(
    <UserProvider>
      <MemoryRouter>
        <AuthForm />
      </MemoryRouter>
    </UserProvider>
  );
  expect(container).toMatchSnapshot();
});
