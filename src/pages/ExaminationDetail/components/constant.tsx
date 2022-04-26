export type workCompleteColType = {
  id: number;
  user_name: string;
  work_status: number;
  submit_time: string;
  score: number;
  is_correct: boolean;
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
    title: '考试状态',
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
    title: '批改状态',
    align: 'center',
    width: 150,
    dataIndex: 'is_correct',
    render(value: number) {
      if (!value) {
        return <p style={{ color: 'red' }}>未批改</p>;
      }
      if (value) {
        return <p style={{ color: '#65AD77' }}>已批改</p>;
      }
      return '';
    },
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
    is_correct: false,
    score: 0,
  },
  {
    id: 2,
    user_name: '李四',
    work_status: 1,
    submit_time: '2022-04-21 13:50:00',
    is_correct: true,
    score: 70,
  },
  {
    id: 3,
    user_name: '王二',
    work_status: 0,
    submit_time: '',
    is_correct: false,
    score: 0,
  },
  {
    id: 4,
    user_name: '小明',
    work_status: 1,
    submit_time: '2022-04-19 12:00:09',
    is_correct: false,
    score: 0,
  },
  {
    id: 5,
    user_name: '张三',
    work_status: 0,
    submit_time: '',
    is_correct: false,
    score: 0,
  },
  {
    id: 6,
    user_name: '张三',
    work_status: 0,
    submit_time: '',
    is_correct: false,
    score: 0,
  },
];
