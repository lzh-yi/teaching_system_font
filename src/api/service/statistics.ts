import URL from '@/api/service/URL';
import request from '@/api/request';

export const completeList = (data: any) => {
  return request({
    method: 'post',
    url: URL.completeList,
    data,
  });
};

export const updateStatistics = (data: any) => {
  return request({
    method: 'post',
    url: URL.updateStatistics,
    data,
  });
};
