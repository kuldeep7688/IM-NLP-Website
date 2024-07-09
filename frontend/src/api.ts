import axios from "axios";
// import { ACCESS_TOKEN } from "./constants"

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  // headers: {
  //   "Content-Type": "application/json",
  // },
});

// Request interceptor for adding authorization token
// api.interceptors.request.use(
//   (config) => {
//     // Modify config headers, add tokens, etc.
//     // Example: const accessToken = localStorage.getItem('accessToken');
//     // if (accessToken) {
//     //   config.headers.Authorization = `Bearer ${accessToken}`;
//     // }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// Response interceptor for handling responses
// api.interceptors.response.use(
//   (response: AxiosResponse) => {
//     // Handle successful responses
//     return response;
//   },
//   (error: AxiosError) => {
//     // Handle error responses
//     if (error.response) {
//       // Handle specific error codes or statuses here
//       console.error("Request failed with status:", error.response.status);
//     }
//     return Promise.reject(error);
//   }
// );

export default api;
