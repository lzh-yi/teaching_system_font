import URL from '@/api/service/URL';
import request from '@/api/request';

export const addGroupWork = (data: any) => {
  return request({
    method: 'post',
    url: URL.addGroupWork,
    data,
  });
};

export const groupWorkList = (data: any) => {
  return request({
    method: 'post',
    url: URL.groupWorkList,
    data,
  });
};

export const updateGroupWork = (data: any) => {
  return request({
    method: 'post',
    url: URL.updateGroupWork,
    data,
  });
};

export const knowledgePointSelectData = (data: any) => {
  return request({
    method: 'post',
    url: URL.knowledgePointSelectDataByGroup,
    data,
  });
};

export const insertCompleteList = (data: any) => {
  return request({
    method: 'post',
    url: URL.insertCompleteList,
    data,
  });
};

export const updateCompleteList = (data: any) => {
  return request({
    method: 'post',
    url: URL.updateCompleteList,
    data,
  });
};
