import URL from '@/api/service/URL';
import request from '@/api/request';

export const addExercise = (data: any) => {
  return request({
    method: 'post',
    url: URL.addExercise,
    data,
  });
};

export const exerciseList = (data: any) => {
  return request({
    method: 'post',
    url: URL.exerciseList,
    data,
  });
};
