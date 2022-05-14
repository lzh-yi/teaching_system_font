import URL from '@/api/service/URL';
import request from '@/api/request';

export const registerUser = (data: any) => {
  return request({
    method: 'post',
    url: URL.registerUser,
    data,
  });
};

export const loginUser = (data: any) => {
  return request({
    method: 'post',
    url: URL.loginUser,
    data,
  });
};

export const userList = (data: any) => {
  return request({
    method: 'post',
    url: URL.userList,
    data,
  });
};
