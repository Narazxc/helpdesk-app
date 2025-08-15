// import axios, { AxiosInstance, AxiosResponse } from "axios";
import axios from "axios";

// Create axios instance - TypeScript will infer the type
//jsonplaceholder.typicode.com/posts

export const api = axios.create({
  // baseURL: "https://jsonplaceholder.typicode.com/",
  headers: {
    Authorization: "Bearer your-token",
  },
  // timeout: 10000,
});

// const api: AxiosInstance = axios.create({
//   baseURL: "http://localhost:5173/",
// });
