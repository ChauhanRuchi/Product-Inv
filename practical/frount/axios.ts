import axios, { AxiosError, AxiosRequestConfig } from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, 
  headers: {
    'Content-Type': 'application/json',
  },
});


api.interceptors.request.use(
  (config: AxiosRequestConfig) => {
   

    return config;
  },
  (error: AxiosError) => Promise.reject(error),
);


api.interceptors.response.use(
  response => response.data,
  (error: AxiosError<any>) => {
    const message =
      error.response?.data?.message ||
      error.message ||
      'Something went wrong..';


    return Promise.reject(message);
  },
);

export default api;
