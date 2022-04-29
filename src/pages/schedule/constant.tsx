type colType = {
  id: number;
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
    dataIndex: 'id',
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
    name: '教学进度1',
    version: '版本1',
    upload_time: '2022-02-01',
    principal: '张三',
  },
  {
    id: 2,
    name: '教学进度1',
    version: '版本2',
    upload_time: '2022-03-01',
    principal: '张三',
  },
  {
    id: 3,
    name: '教学进度2',
    version: '版本1',
    upload_time: '2022-02-04',
    principal: '张三',
  },
  {
    id: 4,
    name: '教学进度3',
    version: '版本1',
    upload_time: '2022-02-19',
    principal: '张三',
  },
];
