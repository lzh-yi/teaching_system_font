import URL from '@/api/service/URL';
import request from '@/api/request';

export const scoreDetail = (data: any) => {
  return request({
    method: 'post',
    url: URL.scoreDetail,
    data,
  });
};

export const scoreDetailByWorkId = (data: any) => {
  return request({
    method: 'post',
    url: URL.scoreDetailByWorkId,
    data,
  });
};

export const finalScoreList = (data: any) => {
  return request({
    method: 'post',
    url: URL.finalScoreList,
    data,
  });
};
