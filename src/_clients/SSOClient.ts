import axios from 'axios';

const defaultOptions = {
  baseURL: `${process.env.NEXT_PUBLIC_SSO_BASE_URI}/api/v1`,
  headers: {
    'Content-Type': 'application/json',
  },
};

const SSOClient = axios.create(defaultOptions);

SSOClient.interceptors.response.use(
  (response) => response,
  (error) =>
    Promise.reject(
      (error.response && error.response.data) || {
        message: 'Something went wrong',
      },
    ),
);

export default SSOClient;