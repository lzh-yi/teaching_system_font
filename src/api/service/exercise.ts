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
  const dataCopy = {
    knowledgePointId: -1,
    ...data,
  };
  return request({
    method: 'post',
    url: URL.exerciseList,
    data: dataCopy,
  });
};
