import URL from '@/api/service/URL';
import request from '@/api/request';

export const degreeAnalyses = (data: any) => {
  return request({
    method: 'post',
    url: URL.degreeAnalyses,
    data,
  });
};
