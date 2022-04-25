type workCompleteColType = {
  id: number;
  user_name: string;
  work_status: number;
  submit_time: string;
  score: number;
};

export const workCompleteCol = [
  {
    title: 'id',
    align: 'center',
    width: 100,
    dataIndex: 'id',
  },
  {
    title: '姓名',
    align: 'center',
    width: 100,
    dataIndex: 'user_name',
  },
  {
    title: '作业状态',
    align: 'center',
    width: 100,
    dataIndex: 'work_status',
    render(value: number) {
      if (value === 0) {
        return <p style={{ color: 'red' }}>未提交</p>;
      }
      if (value === 1) {
        return <p style={{ color: '#65AD77' }}>已提交</p>;
      }
      return '';
    },
  },
  {
    title: '提交时间',
    align: 'center',
    width: 150,
    dataIndex: 'submit_time',
  },
  {
    title: '分数',
    align: 'center',
    width: 100,
    dataIndex: 'score',
  },
];

export const tableDataVal: workCompleteColType[] = [
  {
    id: 1,
    user_name: '张三',
    work_status: 0,
    submit_time: '',
    score: 0,
  },
  {
    id: 2,
    user_name: '李四',
    work_status: 1,
    submit_time: '2022-04-21 13:50:00',
    score: 70,
  },
  {
    id: 3,
    user_name: '王二',
    work_status: 0,
    submit_time: '',
    score: 0,
  },
  {
    id: 4,
    user_name: '小明',
    work_status: 1,
    submit_time: '2022-04-19 12:00:09',
    score: 90,
  },
  {
    id: 5,
    user_name: '张三',
    work_status: 0,
    submit_time: '',
    score: 0,
  },
  {
    id: 6,
    user_name: '张三',
    work_status: 0,
    submit_time: '',
    score: 0,
  },
];
