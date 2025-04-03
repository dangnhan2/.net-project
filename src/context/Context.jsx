import { createContext, useEffect, useState } from "react";
import { refresh } from "../api/api";
import Cookies from "js-cookie";
import axios from "../api/customize";

const UserContext = createContext();
const ContextProvider = ({ children }) => {
  const [dishes, setDishes] = useState([]);
  const [dishesOrder, setDishesOrder] = useState([]);
  const [user, setUser] = useState();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(true);
  useEffect(() => {
    const checkAuth = async () => {
      await resToken();
      setIsRefreshing(false);
    };

    checkAuth();
  }, []);

  const resToken = async () => {
    const refreshToken = Cookies.get("refreshToken");

    setIsRefreshing(true);
    const res = await refresh(refreshToken);
    setIsRefreshing(false);
    // console.log(res);

    if (res?.token) {
      Cookies.set("token", res.token, { secure: true, sameSite: "Strict" });
      Cookies.set("refreshToken", res.refreshToken, {
        secure: true,
        sameSite: "Strict",
      });

      setUser(res.employee);
      setIsAuthenticated(true);

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
        isRefreshing,
        setIsRefreshing,
        isAuthenticated,
        setIsAuthenticated,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, ContextProvider };
