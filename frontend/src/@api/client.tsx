import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

const baseURL = 'https://localhost:5000.com/api/v1/';

export const client = axios.create({
  baseURL,
  timeout: 2000
});

const requestHandler = (request: AxiosRequestConfig) => {
  request.headers.Authorization = '';
  return request;
};

client.interceptors.request.use(request => requestHandler(request));

const responseSuccessHandler = (response: AxiosResponse) => {
  return response.data;
};

const responseErrorHandler = async (error: AxiosError) => {
  let errors = ['Something went wrong, please try again!'];

  if (error.response) {
    if (error.response.data.errors) errors = error.response.data.errors;

    if (error.response.data.error) errors = [error.response.data.error];
  }

  // eslint-disable-next-line prefer-promise-reject-errors
  return Promise.reject({
    status: error.response?.status || 500,
    errors
  });
};

client.interceptors.response.use(
  response => responseSuccessHandler(response),
  error => responseErrorHandler(error)
);
