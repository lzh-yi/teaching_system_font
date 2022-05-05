import URL from '@/api/service/URL';
import request from '@/api/request';

/** 获取教学进度列表 */
export const getTeachingScheduleList = (data: any) => {
  return request({
    method: 'post',
    url: URL.teachingScheduleList,
    data,
  });
};

/** 上传教学进度 */
export const uploadSchedule = (data: any) => {
  return request({
    method: 'post',
    url: URL.uploadSchedule,
    data,
  });
};

/** 更新教学进度 */
export const updateSchedule = (data: any) => {
  return request({
    method: 'post',
    url: URL.updateSchedule,
    data,
  });
};
