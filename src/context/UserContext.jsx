import { createContext, useContext, useState } from 'react';
import { getUser } from '../services/users';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const currentUser = getUser();
  const [user, setUser] = useState(
    currentUser ? { id: currentUser.id, email: currentUser.email } : {}
  );

  console.log(user);

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
