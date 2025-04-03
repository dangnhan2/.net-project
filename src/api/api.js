import axios from "../api/customize";

export const getAllCustomer = (query) => {
  return axios.get(`Customers/GetAllCustomers?${query}`);
};

export const addCustomer = (
  fullName,
  phoneNo,
  email,
  address,
  gender,
  note
) => {
  return axios.post(`Customers/CreateCustomer`, {
    fullName,
    phoneNo,
    email,
    address,
    gender,
    note,
  });
};

export const updateCustomer = (
  id,
  fullName,
  phoneNo,
  email,
  address,
  gender,
  note
) => {
  return axios.put(`Customers/UpdateCustomer/${id}`, {
    fullName,
    phoneNo,
    email,
    address,
    gender,
    note,
  });
};

export const deleteCustomer = (id) => {
  return axios.delete(`Customers/DeleteCustomer/${id}`);
};

export const getAllDishes = (query) => {
  return axios.get(`Dishes/GetAllDishes?${query}`);
};

export const addDish = (name, category, price, description, image) => {
  const formData = new FormData();
  formData.append("name", name); // String
  formData.append("category", category); // String
  formData.append("price", price); // String
  formData.append("description", description); // String
  formData.append("image", image); // File
  return axios.post("Dishes/CreateDish", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const updateDish = (id, name, category, price, description, image) => {
  const formData = new FormData();
  formData.append("name", name); // String
  formData.append("category", category); // String
  formData.append("price", price); // String
  formData.append("description", description); // String
  formData.append("image", image); // File
  return axios.put(`Dishes/UpdateDish/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const deleteDish = (id) => {
  return axios.delete(`Dishes/DeleteDish/${id}`);
};

export const getAllSuppliers = (query) => {
  return axios.get(`Suppliers/GetAllSuppliers?${query}`);
};

export const addSupplier = (name, phoneNo, address, representative, email) => {
  return axios.post(`Suppliers/AddSupplier`, {
    name,
    phoneNo,
    address,
    representative,
    email,
  });
};

export const updateSupplier = (
  id,
  name,
  phoneNo,
  address,
  representative,
  email
) => {
  return axios.put(`Suppliers/UpdateSupplier/${id}`, {
    name,
    phoneNo,
    address,
    representative,
    email,
  });
};

export const deleteSupplier = (id) => {
  return axios.delete(`Suppliers/DeleteSupplier/${id}`);
};

export const getAllTables = (query) => {
  return axios.get(`Tables/GetAllTables?${query}`);
};

export const addTable = (number, capacity, location, status) => {
  return axios.post(`Tables/AddTable`, {
    number,
    capacity,
    location,
    status,
  });
};

export const updateTable = (id, number, capacity, location, status) => {
  return axios.put(`Tables/UpdateTable/${id}`, {
    number,
    capacity,
    location,
    status,
  });
};

export const deleteTable = (id) => {
  return axios.delete(`Tables/DeleteTable/${id}`);
};

export const getAllMenus = (query) => {
  return axios.get(`Menu/GetAllMenus?${query}`);
};

export const updateMenu = (id, name, status, description, dishes) => {
  return axios.put(`Menu/UpdateMenu/${id}`, {
    name,
    status,
    description,
    dishes,
  });
};

export const addMenu = (name, status, description, dishes) => {
  return axios.post(`Menu/AddMenu`, {
    name,
    status,
    description,
    dishes,
  });
};

export const deleteMenu = (id) => {
  return axios.delete(`Menu/DeleteMenu/${id}`);
};

export const login = (email, password) => {
  return axios.post(`Authentication/login-user`, { email, password });
};

export const refresh = (refreshToken) => {
  return axios.post(`Authentication/refresh-token`, { refreshToken });
};

export const getDashBoard = () => {
  return axios.get(`DashBoard/GetDashBoard`);
};

export const getAllEmployee = () => {
  return axios.get(`Employees/GetAllEmployees`);
};

export const addEmployee = (
  fullName,
  phoneNo,
  email,
  address,
  gender,
  status,
  role
) => {
  return axios.post(`Employees/CreateEmployee`, {
    fullName,
    phoneNo,
    email,
    address,
    gender,
    status,
    role,
  });
};

export const updateEmployee = (
  id,
  fullName,
  phoneNo,
  email,
  address,
  gender,
  status,
  role
) => {
  return axios.put(`Employees/UpdateEmployee/${id}`, {
    fullName,
    phoneNo,
    email,
    address,
    gender,
    status,
    role,
  });
};

export const deleteEmployee = (id) => {
  return axios.delete(`Employees/DeleteEmployee/${id}`);
};

export const getAllUnits = () => {
  return axios.get(`Units/GetAllUnits`);
};

export const addUnit = (name) => {
  return axios.post(`Units/CreateUnit`, { name });
};

export const getAllOrders = (query) => {
  return axios.get(`Orders/GetAllOrders?${query}`);
};

export const addOrder = (tableID, customerID, status, total, orderDishes) => {
  return axios.post(`Orders/AddOrder`, {
    tableID,
    customerID,
    status,
    total,
    orderDishes,
  });
};

export const updateOrder = (id, status) => {
  return axios.put(`Orders/UpdateOrder/${id}`, {
    status,
  });
};

export const getAllIngredients = (query) => {
  return axios.get(`Ingredients/GetAllIngredients?${query}`);
};

export const addIngredient = (
  name,
  quantity,
  description,
  price,
  unitID,
  unitType,
  supplierName
) => {
  return axios.post(`Ingredients/CreateIngredient`, {
    name,
    quantity,
    description,
    price,
    unitID,
    unitType,
    supplierName,
  });
};

export const updateIngredient = (
  id,
  name,
  quantity,
  description,
  price,
  unitID,
  unitType,
  supplierName
) => {
  return axios.put(`Ingredients/UpdateIngredient/${id}`, {
    name,
    quantity,
    description,
    price,
    unitID,
    unitType,
    supplierName,
  });
};

export const getAllBills = () => {
  return axios.get(`Bills`);
};

export const addBill = (orderIds, customerId, note) => {
  return axios.post(`Bills/CreateFromOrders`, { orderIds, customerId, note });
};

export const changePassword = (oldPassword, newPassword, confirmPassword) => {
  return axios.post(`Authentication/change-password`, {
    oldPassword,
    newPassword,
    confirmPassword,
  });
};
