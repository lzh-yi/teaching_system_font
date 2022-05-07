import URL from '@/api/service/URL';
import request from '@/api/request';

export const addGroupWork = (data: any) => {
  return request({
    method: 'post',
    url: URL.addGroupWork,
    data,
  });
};

export const groupWorkList = (data: any) => {
  return request({
    method: 'post',
    url: URL.groupWorkList,
    data,
  });
};

export const updateGroupWork = (data: any) => {
  return request({
    method: 'post',
    url: URL.updateGroupWork,
    data,
  });
};
