import axios from 'axios';

const HTTP = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_ENDPOINT,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export default HTTP;
