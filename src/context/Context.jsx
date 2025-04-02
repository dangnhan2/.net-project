import { createContext, useEffect, useState } from "react";
import { refresh } from "../api/api";
import Cookies from "js-cookie";
const UserContext = createContext();
const ContextProvider = ({ children }) => {
  const [dishes, setDishes] = useState([]);
  const [dishesOrder, setDishesOrder] = useState([]);
  const [user, setUser] = useState();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    resToken();
  }, []);

  const resToken = async () => {
    const refreshToken = Cookies.get("refreshToken");

    if (!refreshToken) {
      return;
    }

    const res = await refresh(refreshToken);
    console.log(res);

    if (res?.token) {
      // Save new tokens in cookies
      Cookies.set("token", res.token, { secure: true, sameSite: "Strict" });
      Cookies.set("refreshToken", res.refreshToken, {
        secure: true,
        sameSite: "Strict",
      });

      // Set user data and authentication status
      setUser(res.employee);
      setIsAuthenticated(true);

      // Update Axios headers for future requests
      axios.defaults.headers.Authorization = `Bearer ${res.token}`;
    }
  };

  return (
    <UserContext.Provider
      value={{
        dishes,
        setDishes,
        user,
        setUser,
        dishesOrder,
        setDishesOrder,
        isAuthenticated,
        setIsAuthenticated,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, ContextProvider };
