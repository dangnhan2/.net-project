import { createContext, useState } from "react";

const UserContext = createContext();
const ContextProvider = ({ children }) => {
  const [dishes, setDishes] = useState([]);

  return (
    <UserContext.Provider value={{ dishes, setDishes }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, ContextProvider };
