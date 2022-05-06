import URL from '@/api/service/URL';
import request from '@/api/request';

export const getKnowledgePointSelectData = (data: any) => {
  return request({
    method: 'post',
    url: URL.knowledgePointSelectData,
    data,
  });
};

export const addKnowledgePoint = (data: any) => {
  return request({
    method: 'post',
    url: URL.addKnowledgePoint,
    data,
  });
};

export const knowledgePointList = (data: any) => {
  return request({
    method: 'post',
    url: URL.knowledgePointList,
    data,
  });
};

export const updateKnowledgePoint = (data: any) => {
  return request({
    method: 'post',
    url: URL.updateKnowledgePoint,
    data,
  });
};
