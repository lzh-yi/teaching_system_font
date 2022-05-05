import URL from '@/api/service/URL';
import request from '@/api/request';

export const getTeachingGoalList = (data: any) => {
  return request({
    method: 'post',
    url: URL.teachingGoalList,
    data,
  });
};

/** 添加教学目标 */
export const addTeachingGoal = (data: any) => {
  return request({
    method: 'post',
    url: URL.addTeachingGoal,
    data,
  });
};

/** 修改教学目标 */
export const updateTeachingGoal = (data: any) => {
  return request({
    method: 'post',
    url: URL.updateTeachingGoal,
    data,
  });
};
