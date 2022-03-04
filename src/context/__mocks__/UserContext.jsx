import { createContext, useContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ mockUser, children }) => {
  const [user, setUser] = useState(
    mockUser
      ? {
          id: mockUser.id,
          email: mockUser.email,
        }
      : {}
  );

  const contextValue = { user, setUser };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('Error: useUser needs to be used within UserContext');
  }
  return context;
};
