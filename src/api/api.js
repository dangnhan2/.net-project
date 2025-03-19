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
