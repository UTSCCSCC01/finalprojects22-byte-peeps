import axios from 'axios';

const HTTP = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_ENDPOINT,
  withCredentials: true
});

export default HTTP;