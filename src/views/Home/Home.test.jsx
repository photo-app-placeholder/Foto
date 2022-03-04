import { render, screen } from '@testing-library/react';

jest.mock('../../context/UserContext');


test('testing that our login works', () => {
    render(
      <MemoryRouter>
        <UserProvider mockUser={ }>
          <App />
        </UserProvider>
      </MemoryRouter>

}
);