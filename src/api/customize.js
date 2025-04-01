import axios from "axios";
import Cookies from "js-cookie";
const instance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  // withCredentials: true,
});

instance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    const token = Cookies.get("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    if (response.data && response.data) return response.data;
  },
  function (error) {
    console.log(error);

    if (
      error &&
      error.response &&
      error.response.data &&
      error.response.data.errors
    ) {
      return error.response.data.errors;
    } else {
      return error.response.data;
    }

    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error

    return Promise.reject(error);
  }
);
export default instance;
