import URL from '@/api/service/URL';
import request from '@/api/request';

export const addGroupWork = (data: any) => {
  return request({
    method: 'post',
    url: URL.examination.addGroupWork,
    data,
  });
};

export const groupWorkList = (data: any) => {
  return request({
    method: 'post',
    url: URL.examination.groupWorkList,
    data,
  });
};

export const updateGroupWork = (data: any) => {
  return request({
    method: 'post',
    url: URL.examination.updateGroupWork,
    data,
  });
};

export const knowledgePointSelectData = (data: any) => {
  return request({
    method: 'post',
    url: URL.examination.knowledgePointSelectDataByGroup,
    data,
  });
};

export const insertCompleteList = (data: any) => {
  const dataCopy = {
    knowledgePointId: -1,
    ...data,
  };

  return request({
    method: 'post',
    url: URL.examination.insertCompleteList,
    data: dataCopy,
  });
};

export const updateCompleteList = (data: any) => {
  return request({
    method: 'post',
    url: URL.examination.updateCompleteList,
    data,
  });
};
