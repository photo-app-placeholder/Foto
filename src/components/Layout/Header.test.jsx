import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { UserProvider } from '../../context/UserContext';
import Header from './Header';

test('should display header', () => {
  const { container } = render(
    <UserProvider>
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    </UserProvider>
  );
  expect(container).toMatchSnapshot();
});
