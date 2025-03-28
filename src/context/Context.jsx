import { createContext, useState } from "react";

const UserContext = createContext();
const ContextProvider = ({ children }) => {
  const [dishes, setDishes] = useState([]);
  const [user, setUser] = useState();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <UserContext.Provider
      value={{
        dishes,
        setDishes,
        user,
        setUser,
        isAuthenticated,
        setIsAuthenticated,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, ContextProvider };
