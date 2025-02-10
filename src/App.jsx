import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LayoutAdmin from "./components/Dashboard";
import Login from "./components/Login";
import UserTable from "./components/table/UserTable";
import SupplierTable from "./components/table/SupplierTable";
import T_Table from "./components/table/Table";
import IngredientTable from "./components/table/IngredientTable";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutAdmin />,
    children: [
      {
        path: "/customer",
        element: <UserTable />,
      },
      {
        path: "/ingredients",
        element: <IngredientTable />,
      },
      {
        path: "/table",
        element: <T_Table />,
      },
      {
        path: "/supplier",
        element: <SupplierTable />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  // Add more routes as needed...
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
