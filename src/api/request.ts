import axios from 'axios';
import { history } from 'umi';

const request = axios.create({
  timeout: 40000,
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
  },
});

request.interceptors.request.use(
  (config: any) => {
    // 请求头带上token
    config.headers['token'] = localStorage.getItem('token') || '';
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

/**
 * 响应拦截
 */
request.interceptors.response.use(
  (response) => {
    if (response.data && response.data.code === 401) {
      // 401, token失效
      localStorage.removeItem('token');
      history.push('/');
    }
    return response.data;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default request;
