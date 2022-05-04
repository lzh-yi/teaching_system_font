import URL from '@/api/service/URL';
import request from '@/api/request';

export const getTeachingOutlineList = (data: any) => {
  return request({
    method: 'post',
    url: URL.teachingOutlineList,
    data,
  });
};

/** 下载教学大纲 */
export const downloadOutline = () => {
  return request({
    method: 'get',
    url: URL.downloadOutline,
  });
};

/** 上传教学大纲 */
export const uploadOutline = (data: any) => {
  return request({
    method: 'post',
    url: URL.uploadOutline,
    data,
  });
};
