import { createContext, useContext, useState } from 'react';

const UserContext = createContext(null);

export default UserContext;

const UserContextProvider = ({ children }) => {
    const [loggedInUser, setLoggedInUser] = useState("no user yet");
  
    return (
      <UserContext.Provider value={{ loggedInUser, setLoggedInUser }}>
        {children}
      </UserContext.Provider>
    );
};
const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
      throw new Error('useUser must be used within a UserProvider');
    }
    return context;
  };
  
  export { UserContextProvider, useUser };
  