import { createContext, useState } from 'react';

export const UserContext = createContext();

function UserProvider({ children }) {
  const [currentUser, setCurrentUser] = useState({ username: 'grumpy19' });

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;
