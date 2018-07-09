import request from 'axios';

request.interceptors.response.use(
  resp => resp.data,
  err => Promise.reject(err)
);

export default request;
