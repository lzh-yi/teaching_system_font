import URL from '@/api/service/URL';
import request from '@/api/request';

export const getTeachingOutlineList = () => {
  return request({
    method: 'get',
    url: URL.teachingOutlineList,
  });
};
