import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import CustomerTable from "./components/table/CustomerTable";
import SupplierTable from "./components/table/SupplierTable";
import T_Table from "./components/table/Table";
import IngredientTable from "./components/table/IngredientTable";
import LayoutAdmin from "./components/Layout";
import EmployeeTable from "./components/table/EmployeeTable";
import DishTable from "./components/table/DishTable";
import OrderTable from "./components/table/OrderTable";
import BillTable from "./components/table/BillTable";
import MenuTable from "./components/table/MenuTable";
import ShiftTable from "./components/table/ShiftTable";
import ProtectedRoute from "./components/auth/auth";
import ChangePassword from "./components/ChangePassword";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <LayoutAdmin />
      </ProtectedRoute>
    ),

    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "/customer",
        element: <CustomerTable />,
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
      {
        path: "/dish",
        element: <DishTable />,
      },
      {
        path: "/menu",
        element: <MenuTable />,
      },
      {
        path: "/order",
        element: <OrderTable />,
      },
      {
        path: "/bill",
        element: <BillTable />,
      },
      {
        path: "/employee",
        element: <EmployeeTable />,
      },
      {
        path: "/shift",
        element: <ShiftTable></ShiftTable>,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/change",
    element: <ChangePassword />,
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
