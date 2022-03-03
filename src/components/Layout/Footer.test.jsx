import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { UserProvider } from '../../context/UserContext';
import Footer from './Footer';

test('should display footer', () => {
  const { container } = render(
    <UserProvider>
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    </UserProvider>
  );
  expect(container).toMatchSnapshot();
});
