import { Button, Space } from 'antd';

type colType = {
  id: number;
  number: string;
  name: string;
  version: string;
  upload_time: string;
  principal: string;
};

export const columnConfig = [
  {
    title: '编号',
    align: 'center',
    width: 100,
    dataIndex: 'number',
  },
  {
    title: '标题',
    align: 'center',
    width: 100,
    dataIndex: 'name',
  },
  {
    title: '版本',
    align: 'center',
    width: 100,
    dataIndex: 'version',
  },
  {
    title: '上传时间',
    align: 'center',
    width: 100,
    dataIndex: 'upload_time',
  },
  {
    title: '负责人',
    align: 'center',
    width: 100,
    dataIndex: 'principal',
  },
];

export const tableDataVal: colType[] = [
  {
    id: 1,
    number: '001',
    name: '教学大纲1',
    version: '版本1',
    upload_time: '2022-02-01',
    principal: '张三',
  },
  {
    id: 2,
    number: '002',
    name: '教学大纲1',
    version: '版本2',
    upload_time: '2022-03-01',
    principal: '张三',
  },
  {
    id: 3,
    number: '003',
    name: '教学大纲2',
    version: '版本1',
    upload_time: '2022-02-04',
    principal: '张三',
  },
  {
    id: 4,
    number: '004',
    name: '教学大纲3',
    version: '版本1',
    upload_time: '2022-02-19',
    principal: '张三',
  },
];
