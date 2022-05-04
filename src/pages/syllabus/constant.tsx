import dayjs from 'dayjs';

type colType = {
  id: number;
  title: string;
  version: string;
  uploadingTime: string;
  principal: string;
};

export const columnConfig = [
  // {
  //   title: '编号',
  //   align: 'center',
  //   width: 100,
  //   dataIndex: 'id',
  // },
  {
    title: '大纲标题',
    align: 'center',
    width: 200,
    dataIndex: 'title',
  },
  {
    title: '大纲版本',
    align: 'center',
    width: 100,
    dataIndex: 'version',
  },
  {
    title: '上传时间',
    align: 'center',
    width: 150,
    dataIndex: 'uploadingTime',
    render(value: any) {
      return dayjs(value).format('YYYY-MM-DD HH:mm:ss');
    },
  },
  {
    title: '负责人',
    align: 'center',
    width: 100,
    dataIndex: 'principal',
  },
];

// export const tableDataVal: colType[] = [
//   {
//     id: 1,
//     name: '教学大纲1',
//     version: '版本1',
//     upload_time: '2022-02-01',
//     principal: '张三',
//   },
//   {
//     id: 2,
//     name: '教学大纲1',
//     version: '版本2',
//     upload_time: '2022-03-01',
//     principal: '张三',
//   },
//   {
//     id: 3,
//     name: '教学大纲2',
//     version: '版本1',
//     upload_time: '2022-02-04',
//     principal: '张三',
//   },
//   {
//     id: 4,
//     name: '教学大纲3',
//     version: '版本1',
//     upload_time: '2022-02-19',
//     principal: '张三',
//   },
// ];
