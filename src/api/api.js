import axios from "../api/customize";

export const getAllCustomer = () => {
  return axios.get(`Customers/GetAllCustomers`);
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

export const getAllDishes = () => {
  return axios.get(`Dishes/GetAllDishes`);
};

export const addDish = (Name, Category, Price, Description, Image) => {
  return axios.post(`Dishes/CreateDish`, {
    Name,
    Category,
    Price,
    Description,
    Image,
  });
};
