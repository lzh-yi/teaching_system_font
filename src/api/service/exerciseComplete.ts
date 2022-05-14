import URL from '@/api/service/URL';
import request from '@/api/request';

export const addExerciseComplete = (data: any) => {
  return request({
    method: 'post',
    url: URL.addExerciseComplete,
    data,
  });
};
